const parseDate = (dateInfo) => {
  const dateParser = /^([A-Za-z]+) ([A-Za-z]+) (\d+) (\d+)/;

  const month = dateInfo.match(dateParser)[2];
  const date = dateInfo.match(dateParser)[3];
  const year = dateInfo.match(dateParser)[4];

  const months = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

  return `${year}-${months[month]}-${date}`;
};

export default parseDate;
