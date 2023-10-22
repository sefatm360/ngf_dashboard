const lib = {};

lib.separate = (arr) => {
  return arr.reduce(
    (acc, curr) => {
      curr.status === 'Pending' && acc.pending.push(curr);
      curr.status === 'Approved' && acc.approved.push(curr);
      curr.status === 'Rejected' && acc.rejected.push(curr);

      return acc;
    },
    {
      approved: [],
      pending: [],
      rejected: [],
    }
  );
};

lib.orderSeparate = (arr) => {
  return arr.reduce(
    (acc, curr) => {
      curr.status === 'Delivered' && acc.delivered.push(curr);
      curr.status === 'Pending' && acc.pending.push(curr);
      curr.status === 'Approved' && acc.approved.push(curr);
      curr.status === 'Shipped ' && acc.shipped.push(curr);
      curr.status === 'Rejected' && acc.rejected.push(curr);

      return acc;
    },
    {
      approved: [],
      pending: [],
      shipped: [],
      delivered: [],
      rejected: [],
    }
  );
};

lib.productSeparate = (arr) => {
  return arr.reduce(
    (acc, curr) => {
      curr.status === 'Pending' && acc.pending.push(curr);
      curr.status === 'Approved' && acc.approved.push(curr);
      curr.status === 'Rejected' && acc.rejected.push(curr);
      curr.status === 'Disabled' && acc.disabled.push(curr);
      return acc;
    },
    {
      approved: [],
      pending: [],
      rejected: [],
      disabled: [],
    }
  );
};

lib.dateParser = (createdAt) => {
  const months = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec',
  };

  const date = createdAt;

  const day = date.split('-')[2].split('').slice(0, 2).join('');

  const month = date.split('-').slice(0, 2)[1];
  const year = date.split('-').slice(0, 2)[0];

  return `${day} ${months[month]} ${year}`;
};

lib.monthConverter = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'June',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};
export default lib;
