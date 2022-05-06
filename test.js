exports.chart = async (req, res) => {
  try {
    const dateFrom = req.query.dateFrom || 'Jan 1 1970';
    const dateTo = req.query.dateTo || `${Date()}`;
    let period = req.query.period || 'monthly';
    let format;
    let mFormat;
    var pipeline = [];

    var d = new Date();

    let myDateFrom = convertDate(dateFrom);
    let myDateTo = convertDate(dateTo);

    let dateFilterQuery = {};

    if (dateFrom || dateTo) {
      dateFilterQuery = {
        createdAt: {
          $gte: new Date(myDateFrom),
          $lte: new Date(myDateTo),
        },
      };
    }

    switch (period) {
      case 'daily':
        format = {
          $substr: ['$createdAt', 0, 10],
        };
        d.setDate(d.getDate() - 14);
        mFormat = getDaysDate(moment(d).format(), moment().format());
        break;

      case 'weekly':
        format = { $substr: ['$createdAt', 0, 10] };
        d.setDate(d.getDate() - 140);
        mFormat = getWeeksDate(moment(d).format(), moment().format());
        break;

      case 'monthly':
        format = {
          $substr: ['$createdAt', 0, 7],
        };
        d.setDate(d.getDate() - 365);
        mFormat = getMonthsDate(moment(d).format(), moment().format());
        break;

      case 'yearly':
        format = {
          $substr: ['$createdAt', 0, 4],
        };
        d.setDate(d.getDate() - 3652);
        mFormat = getYearsDate(moment(d).format(), moment().format());
        break;

      default:
    }

    const queries = [
      {
        $match: dateFilterQuery,
      },

      {
        $project: {
          date: format,
          signInCount: '$signInCount',
          guestSignInCount: '$guestSignInCount',
        },
      },

      {
        $sort: {
          date: -1,
        },
      },

      {
        $group: {
          _id: {
            date: '$date',
          },
          signInCount: { $sum: '$signInCount' },
          guestSignInCount: { $sum: '$guestSignInCount' },
        },
      },

      {
        $group: {
          _id: null,
          data: {
            $push: {
              date: '$_id.date',
              signInCount: '$signInCount',
              guestSignInCount: '$guestSignInCount',
            },
          },
        },
      },

      {
        $project: {
          data: {
            $map: {
              input: mFormat,
              as: 'e',
              in: {
                $let: {
                  vars: { dateIndex: { $indexOfArray: ['$data.date', '$$e'] } },
                  in: {
                    $cond: {
                      if: { $ne: ['$$dateIndex', -1] },
                      then: {
                        date: '$$e',
                        signInCount: {
                          $arrayElemAt: ['$data.signInCount', '$$dateIndex'],
                        },
                        guestSignInCount: {
                          $arrayElemAt: ['$data.guestSignInCount', '$$dateIndex'],
                        },

                        // Add Guest Sign Ins and Signed Ins to get Platform visits
                        visitCount: {
                          $add: [
                            {
                              $arrayElemAt: ['$data.signInCount', '$$dateIndex'],
                            },
                            {
                              $arrayElemAt: ['$data.guestSignInCount', '$$dateIndex'],
                            },
                          ],
                        },
                      },
                      else: {
                        date: '$$e',
                        signInCount: 0,
                        guestSignInCount: 0,
                        visitCount: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unwind: '$data',
      },

      {
        $sort: {
          _id: -1,
        },
      },

      {
        $project: {
          _id: 0,
          data: '$data',
        },
      },
    ];

    pipeline.push(...queries);

    const chart = await Counter.aggregate(pipeline).allowDiskUse(true);

    // save Cached data

    res.status(200).json({
      status: 'success',
      code: '200',
      message: 'Successfully fetched User Insights Chart dataset',
      chart: chart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      code: '500',
      message: error.message,
    });
  }
};
