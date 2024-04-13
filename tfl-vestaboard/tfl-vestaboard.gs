const fetchStatusData = () => {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const key = scriptProperties.getProperty('TFL_API_KEY')
    const response = UrlFetchApp.fetch(`https://api.tfl.gov.uk/Line/Mode/tube,%20elizabeth-line/Status?app_key=${key}`)
    const json = response.getContentText();
    return json;
  } catch (error) {
    console.log('Error fetching data:', error);
  };
};

const updateBoard = () => {
  const startHour = 17;
  const endHour = 18;
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  if (currentHour >= startHour && currentHour < endHour) {
    const json = fetchStatusData();
    const data = JSON.parse(json);
    const scriptProperties = PropertiesService.getScriptProperties();
    const key = scriptProperties.getProperty('BOARD_API_KEY');
    var row = 0;
    const statusCode = {"Good Service": 66, "Minor Delays": 65, "Severe Delays": 63, "Suspended": 63}
    var board = [
      [2,1,11,5,18,12,15,15,0,0,71,3,5,14,20,18,1,12,0,0,0,71],
      [3,9,18,3,12,5,0,0,0,0,71,4,9,19,20,18,9,3,20,0,0,71],
      [5,12,9,26,1,2,5,20,8,0,71,8,1,13,0,47,0,3,9,20,25,71],
      [10,21,2,9,12,5,5,0,0,0,71,13,5,20,18,15,16,15,12,0,0,71],
      [14,15,18,20,8,5,18,14,0,0,71,16,9,3,3,1,4,9,12,12,25,71],
      [22,9,3,20,15,18,9,1,0,0,71,23,1,20,0,47,0,3,9,20,25,71],
    ];

    if (currentMinute < 59) {
      for (var i = 0; i < data.length; i++) {
        var line = data[i]['name'];
        var status = data[i]['lineStatuses'][0]['statusSeverityDescription'];
        var reason = data[i]['lineStatuses'][0]['reason'];
        const delays = ['Minor Delays', 'Severe Delays', 'Suspended']
        var index = i % 2 === 0 ? 10 : 21;
        board[row][index] = statusCode[status];

        if (index === 21) {
            row += 1
        }
        if (delays.includes(status)) {
            console.log(`${line} - ${status} (${reason})`);
        } else {
            console.log(`${line} - ${status}`);
        }
      };
    }
    
  // Log board output if needed for troubleshooting
    // const formattedOutput = board.map(row =>
    //   `[${row.map(num => num.toString().padStart(2, '0')).join(',')}]`
    // );
    // console.log(formattedOutput);

    try {
      UrlFetchApp.fetch("https://rw.vestaboard.com/", {
      payload: JSON.stringify(board),
      // body: JSON.stringify({ text: "Testing..." }),
      headers: {
        "Content-Type": "application/json",
        "X-Vestaboard-Read-Write-Key": key,
      },
      method: "POST",
    });
    console.log('Board updated!')
    } catch (error) {
      if (error.message.indexOf('304') !== -1) {
        console.log('No changes published to the board');
      } else {
        console.log('Error posting to vesta board:', error);
      }
    }
  } else {
    console.log('Outside scheduled hours. Function will not run.')
  }
};