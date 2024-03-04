const dataSource = [
  {
    "gpsdate": "2020-05-02 00:54:05",
    "location": {
      "lat": 16.795606,
      "lng": 99.155498
    },
    "course": 329,
    "speed": 0,
    "rpm": 767,
    "fuel": 61,
    "coolant": 51
  },
  {
    "gpsdate": "2020-05-02 00:54:21",
    "location": {
      "lat": 16.795758,
      "lng": 99.15525
    },
    "course": 325.4,
    "speed": 4,
    "rpm": 827,
    "fuel": 61,
    "coolant": 51
  },
  {
    "gpsdate": "2020-05-02 00:54:36",
    "location": {
      "lat": 16.795738,
      "lng": 99.155278
    },
    "course": 322.3,
    "speed": 5,
    "rpm": 1020,
    "fuel": 62,
    "coolant": 52
  },
  {
    "gpsdate": "2020-05-02 00:54:52",
    "location": {
      "lat": 16.795823,
      "lng": 99.15519
    },
    "course": 310.5,
    "speed": 3,
    "rpm": 707,
    "fuel": 63,
    "coolant": 53
  },
  {
    "gpsdate": "2020-05-02 00:55:08",
    "location": {
      "lat": 16.79589,
      "lng": 99.155116
    },
    "course": 316.5,
    "speed": 0,
    "rpm": 737,
    "fuel": 64,
    "coolant": 54
  },
  {
    "gpsdate": "2020-05-02 00:55:23",
    "location": {
      "lat": 16.795905,
      "lng": 99.155096
    },
    "course": 303.4,
    "speed": 0,
    "rpm": 488,
    "fuel": 64,
    "coolant": 54
  },
  {
    "gpsdate": "2020-05-02 01:01:01",
    "location": {
      "lat": 16.795796,
      "lng": 99.155131
    },
    "course": 158.2,
    "speed": 6,
    "rpm": 1260,
    "fuel": 64,
    "coolant": 54
  },
  {
    "gpsdate": "2020-05-02 01:01:16",
    "location": {
      "lat": 16.79564,
      "lng": 99.155381
    },
    "course": 121.4,
    "speed": 8,
    "rpm": 1390,
    "fuel": 65,
    "coolant": 55
  },
  {
    "gpsdate": "2020-05-02 01:01:32",
    "location": {
      "lat": 16.795496,
      "lng": 99.15568
    },
    "course": 76.3,
    "speed": 8,
    "rpm": 1329,
    "fuel": 66,
    "coolant": 56
  },
  {
    "gpsdate": "2020-05-02 01:01:48",
    "location": {
      "lat": 16.795771,
      "lng": 99.155856
    },
    "course": 36.8,
    "speed": 6,
    "rpm": 1252,
    "fuel": 68,
    "coolant": 58
  },
  {
    "gpsdate": "2020-05-02 01:02:03",
    "location": {
      "lat": 16.79588,
      "lng": 99.155933
    },
    "course": 34.9,
    "speed": 0,
    "rpm": 488,
    "fuel": 68,
    "coolant": 58
  },
  {
    "gpsdate": "2020-05-02 01:02:50",
    "location": {
      "lat": 16.795876,
      "lng": 99.155941
    },
    "course": 138.6,
    "speed": 0,
    "rpm": 1051,
    "fuel": 69,
    "coolant": 59
  },
  {
    "gpsdate": "2020-05-02 01:03:06",
    "location": {
      "lat": 16.795743,
      "lng": 99.155845
    },
    "course": 223.1,
    "speed": 4,
    "rpm": 1249,
    "fuel": 70,
    "coolant": 60
  },
  {
    "gpsdate": "2020-05-02 01:03:22",
    "location": {
      "lat": 16.795545,
      "lng": 99.155738
    },
    "course": 160.1,
    "speed": 4,
    "rpm": 719,
    "fuel": 70,
    "coolant": 60
  },
  {
    "gpsdate": "2020-05-02 01:03:37",
    "location": {
      "lat": 16.795556,
      "lng": 99.155768
    },
    "course": 41.8,
    "speed": 0,
    "rpm": 486,
    "fuel": 71,
    "coolant": 61
  },
  {
    "gpsdate": "2020-05-02 01:21:38",
    "location": {
      "lat": 16.795748,
      "lng": 99.155813
    },
    "course": 39.8,
    "speed": 5,
    "rpm": 890,
    "fuel": 78,
    "coolant": 68
  },
  {
    "gpsdate": "2020-05-02 01:21:54",
    "location": {
      "lat": 16.79586,
      "lng": 99.155915
    },
    "course": 33.2,
    "speed": 5,
    "rpm": 991,
    "fuel": 79,
    "coolant": 69
  },
  {
    "gpsdate": "2020-05-02 01:22:10",
    "location": {
      "lat": 16.795905,
      "lng": 99.155945
    },
    "course": 32,
    "speed": 0,
    "rpm": 541,
    "fuel": 80,
    "coolant": 70
  },
  {
    "gpsdate": "2020-05-02 01:29:28",
    "location": {
      "lat": 16.796155,
      "lng": 99.156165
    },
    "course": 1.5,
    "speed": 5,
    "rpm": 1112,
    "fuel": 83,
    "coolant": 73
  },
  {
    "gpsdate": "2020-05-02 01:29:41",
    "location": {
      "lat": 16.79636,
      "lng": 99.155883
    },
    "course": 299.4,
    "speed": 16,
    "rpm": 1536,
    "fuel": 83,
    "coolant": 73
  },
  {
    "gpsdate": "2020-05-02 01:29:57",
    "location": {
      "lat": 16.796865,
      "lng": 99.154906
    },
    "course": 300.4,
    "speed": 32,
    "rpm": 1526,
    "fuel": 87,
    "coolant": 77
  },
  {
    "gpsdate": "2020-05-02 01:30:12",
    "location": {
      "lat": 16.797253,
      "lng": 99.154196
    },
    "course": 299.9,
    "speed": 0,
    "rpm": 496,
    "fuel": 89,
    "coolant": 79
  },
  {
    "gpsdate": "2020-05-02 01:32:14",
    "location": {
      "lat": 16.797415,
      "lng": 99.153941
    },
    "course": 302.8,
    "speed": 17,
    "rpm": 1682,
    "fuel": 90,
    "coolant": 80
  },
  {
    "gpsdate": "2020-05-02 01:32:29",
    "location": {
      "lat": 16.797916,
      "lng": 99.153071
    },
    "course": 301.1,
    "speed": 29,
    "rpm": 1387,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 01:32:45",
    "location": {
      "lat": 16.798675,
      "lng": 99.151761
    },
    "course": 300.2,
    "speed": 43,
    "rpm": 1464,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:33:00",
    "location": {
      "lat": 16.799636,
      "lng": 99.150128
    },
    "course": 304.9,
    "speed": 54,
    "rpm": 1862,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:33:16",
    "location": {
      "lat": 16.801218,
      "lng": 99.14835
    },
    "course": 318.6,
    "speed": 61,
    "rpm": 1498,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:33:32",
    "location": {
      "lat": 16.803183,
      "lng": 99.146535
    },
    "course": 318.2,
    "speed": 68,
    "rpm": 1654,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:33:47",
    "location": {
      "lat": 16.805183,
      "lng": 99.144693
    },
    "course": 318.4,
    "speed": 73,
    "rpm": 1690,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:34:03",
    "location": {
      "lat": 16.807388,
      "lng": 99.142673
    },
    "course": 318.2,
    "speed": 70,
    "rpm": 1223,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:34:19",
    "location": {
      "lat": 16.809458,
      "lng": 99.140766
    },
    "course": 318.3,
    "speed": 70,
    "rpm": 1236,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:34:26",
    "location": {
      "lat": 16.81043,
      "lng": 99.13987
    },
    "course": 318.4,
    "speed": 77,
    "rpm": 1354,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:34:34",
    "location": {
      "lat": 16.811611,
      "lng": 99.138768
    },
    "course": 318.4,
    "speed": 79,
    "rpm": 1397,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:34:50",
    "location": {
      "lat": 16.81403,
      "lng": 99.136538
    },
    "course": 317.8,
    "speed": 80,
    "rpm": 1394,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:35:21",
    "location": {
      "lat": 16.818693,
      "lng": 99.132235
    },
    "course": 318.4,
    "speed": 79,
    "rpm": 1385,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:35:37",
    "location": {
      "lat": 16.821081,
      "lng": 99.130016
    },
    "course": 318.1,
    "speed": 79,
    "rpm": 1384,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:35:53",
    "location": {
      "lat": 16.823433,
      "lng": 99.127841
    },
    "course": 318.8,
    "speed": 77,
    "rpm": 1364,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:36:08",
    "location": {
      "lat": 16.82564,
      "lng": 99.125808
    },
    "course": 317.8,
    "speed": 78,
    "rpm": 1367,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:36:24",
    "location": {
      "lat": 16.827998,
      "lng": 99.123631
    },
    "course": 318.3,
    "speed": 77,
    "rpm": 1346,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:36:40",
    "location": {
      "lat": 16.83031,
      "lng": 99.121506
    },
    "course": 318.2,
    "speed": 76,
    "rpm": 1342,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:36:55",
    "location": {
      "lat": 16.832468,
      "lng": 99.119495
    },
    "course": 318.3,
    "speed": 76,
    "rpm": 1317,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:37:02",
    "location": {
      "lat": 16.833455,
      "lng": 99.118585
    },
    "course": 318.3,
    "speed": 74,
    "rpm": 1292,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:11",
    "location": {
      "lat": 16.834743,
      "lng": 99.117461
    },
    "course": 322.2,
    "speed": 74,
    "rpm": 1308,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:16",
    "location": {
      "lat": 16.835508,
      "lng": 99.11689
    },
    "course": 327.3,
    "speed": 75,
    "rpm": 1316,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:22",
    "location": {
      "lat": 16.836496,
      "lng": 99.116328
    },
    "course": 333.1,
    "speed": 74,
    "rpm": 1297,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:27",
    "location": {
      "lat": 16.837323,
      "lng": 99.115895
    },
    "course": 332.9,
    "speed": 73,
    "rpm": 1279,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:42",
    "location": {
      "lat": 16.839596,
      "lng": 99.11469
    },
    "course": 332.9,
    "speed": 61,
    "rpm": 1053,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:37:56",
    "location": {
      "lat": 16.841138,
      "lng": 99.11384
    },
    "course": 321.2,
    "speed": 31,
    "rpm": 548,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:57",
    "location": {
      "lat": 16.841193,
      "lng": 99.113783
    },
    "course": 312.4,
    "speed": 31,
    "rpm": 480,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:58",
    "location": {
      "lat": 16.841236,
      "lng": 99.113716
    },
    "course": 301.1,
    "speed": 31,
    "rpm": 907,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:37:59",
    "location": {
      "lat": 16.841266,
      "lng": 99.113643
    },
    "course": 290.3,
    "speed": 30,
    "rpm": 1112,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:00",
    "location": {
      "lat": 16.841283,
      "lng": 99.113565
    },
    "course": 278.3,
    "speed": 30,
    "rpm": 1032,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:01",
    "location": {
      "lat": 16.841281,
      "lng": 99.113486
    },
    "course": 266.3,
    "speed": 30,
    "rpm": 1016,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:01",
    "location": {
      "lat": 16.841281,
      "lng": 99.113486
    },
    "course": 266.3,
    "speed": 30,
    "rpm": 998,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:02",
    "location": {
      "lat": 16.841268,
      "lng": 99.11341
    },
    "course": 255.1,
    "speed": 29,
    "rpm": 994,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:03",
    "location": {
      "lat": 16.841241,
      "lng": 99.113338
    },
    "course": 246.2,
    "speed": 29,
    "rpm": 1005,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:38:04",
    "location": {
      "lat": 16.841205,
      "lng": 99.11327
    },
    "course": 240.6,
    "speed": 29,
    "rpm": 1008,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 01:38:19",
    "location": {
      "lat": 16.840616,
      "lng": 99.112218
    },
    "course": 238.7,
    "speed": 29,
    "rpm": 1312,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 01:38:35",
    "location": {
      "lat": 16.840001,
      "lng": 99.111136
    },
    "course": 240.3,
    "speed": 33,
    "rpm": 1542,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:38:50",
    "location": {
      "lat": 16.839315,
      "lng": 99.109936
    },
    "course": 238.9,
    "speed": 39,
    "rpm": 1353,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:39:06",
    "location": {
      "lat": 16.838383,
      "lng": 99.108281
    },
    "course": 239.6,
    "speed": 50,
    "rpm": 1223,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:39:22",
    "location": {
      "lat": 16.837228,
      "lng": 99.106246
    },
    "course": 239.4,
    "speed": 61,
    "rpm": 1080,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:39:37",
    "location": {
      "lat": 16.836025,
      "lng": 99.104055
    },
    "course": 239.3,
    "speed": 65,
    "rpm": 1155,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:39:53",
    "location": {
      "lat": 16.834605,
      "lng": 99.101621
    },
    "course": 239.5,
    "speed": 71,
    "rpm": 1249,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:40:07",
    "location": {
      "lat": 16.83329,
      "lng": 99.099311
    },
    "course": 239.7,
    "speed": 75,
    "rpm": 1316,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:40:09",
    "location": {
      "lat": 16.833098,
      "lng": 99.09897
    },
    "course": 240,
    "speed": 75,
    "rpm": 1329,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:40:24",
    "location": {
      "lat": 16.831616,
      "lng": 99.096351
    },
    "course": 239.4,
    "speed": 79,
    "rpm": 1373,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:40:40",
    "location": {
      "lat": 16.83001,
      "lng": 99.0935
    },
    "course": 239.8,
    "speed": 80,
    "rpm": 1403,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:40:56",
    "location": {
      "lat": 16.828381,
      "lng": 99.090586
    },
    "course": 239.6,
    "speed": 80,
    "rpm": 1393,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:41:11",
    "location": {
      "lat": 16.826805,
      "lng": 99.087888
    },
    "course": 239.2,
    "speed": 81,
    "rpm": 1426,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:41:27",
    "location": {
      "lat": 16.825168,
      "lng": 99.085005
    },
    "course": 239.5,
    "speed": 80,
    "rpm": 1398,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:41:43",
    "location": {
      "lat": 16.823516,
      "lng": 99.082085
    },
    "course": 239.5,
    "speed": 80,
    "rpm": 1398,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:41:58",
    "location": {
      "lat": 16.821996,
      "lng": 99.079406
    },
    "course": 239.3,
    "speed": 77,
    "rpm": 1340,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:42:05",
    "location": {
      "lat": 16.821366,
      "lng": 99.078213
    },
    "course": 244.8,
    "speed": 72,
    "rpm": 1242,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:42:14",
    "location": {
      "lat": 16.820833,
      "lng": 99.076645
    },
    "course": 255.2,
    "speed": 70,
    "rpm": 1236,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:42:30",
    "location": {
      "lat": 16.820123,
      "lng": 99.07375
    },
    "course": 255.5,
    "speed": 69,
    "rpm": 1671,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:42:45",
    "location": {
      "lat": 16.81949,
      "lng": 99.071151
    },
    "course": 255.1,
    "speed": 69,
    "rpm": 1671,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:42:59",
    "location": {
      "lat": 16.81886,
      "lng": 99.06865
    },
    "course": 250,
    "speed": 70,
    "rpm": 1693,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:43:01",
    "location": {
      "lat": 16.81872,
      "lng": 99.068318
    },
    "course": 243.2,
    "speed": 68,
    "rpm": 1648,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:03",
    "location": {
      "lat": 16.81854,
      "lng": 99.068023
    },
    "course": 234.2,
    "speed": 66,
    "rpm": 1592,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:05",
    "location": {
      "lat": 16.818326,
      "lng": 99.067765
    },
    "course": 226,
    "speed": 64,
    "rpm": 1548,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:07",
    "location": {
      "lat": 16.818088,
      "lng": 99.067546
    },
    "course": 218.3,
    "speed": 63,
    "rpm": 1507,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:09",
    "location": {
      "lat": 16.81783,
      "lng": 99.067366
    },
    "course": 210.5,
    "speed": 61,
    "rpm": 1469,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:11",
    "location": {
      "lat": 16.81756,
      "lng": 99.067226
    },
    "course": 203.6,
    "speed": 59,
    "rpm": 1425,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:43:26",
    "location": {
      "lat": 16.815631,
      "lng": 99.066343
    },
    "course": 209.1,
    "speed": 56,
    "rpm": 1371,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:43:41",
    "location": {
      "lat": 16.813871,
      "lng": 99.064856
    },
    "course": 228.7,
    "speed": 62,
    "rpm": 1489,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:43:57",
    "location": {
      "lat": 16.812615,
      "lng": 99.06275
    },
    "course": 242.8,
    "speed": 57,
    "rpm": 1363,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:44:13",
    "location": {
      "lat": 16.811491,
      "lng": 99.060833
    },
    "course": 229.9,
    "speed": 50,
    "rpm": 1204,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:44:28",
    "location": {
      "lat": 16.810293,
      "lng": 99.059421
    },
    "course": 233.4,
    "speed": 50,
    "rpm": 1240,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:44:44",
    "location": {
      "lat": 16.80899,
      "lng": 99.057418
    },
    "course": 236.4,
    "speed": 63,
    "rpm": 1540,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:45:00",
    "location": {
      "lat": 16.807498,
      "lng": 99.055115
    },
    "course": 235.9,
    "speed": 69,
    "rpm": 1688,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:45:16",
    "location": {
      "lat": 16.80588,
      "lng": 99.05264
    },
    "course": 236.1,
    "speed": 70,
    "rpm": 1684,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:45:31",
    "location": {
      "lat": 16.804835,
      "lng": 99.050558
    },
    "course": 254.5,
    "speed": 55,
    "rpm": 1346,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:45:47",
    "location": {
      "lat": 16.80483,
      "lng": 99.048065
    },
    "course": 277.3,
    "speed": 63,
    "rpm": 1547,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:46:00",
    "location": {
      "lat": 16.804658,
      "lng": 99.04593
    },
    "course": 251.1,
    "speed": 63,
    "rpm": 1522,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:46:15",
    "location": {
      "lat": 16.80387,
      "lng": 99.044053
    },
    "course": 246.2,
    "speed": 33,
    "rpm": 746,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:46:31",
    "location": {
      "lat": 16.803605,
      "lng": 99.043441
    },
    "course": 248.6,
    "speed": 0,
    "rpm": 493,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:34:26",
    "location": {
      "lat": 16.81043,
      "lng": 99.13987
    },
    "course": 318.4,
    "speed": 77,
    "rpm": 1354,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:34:34",
    "location": {
      "lat": 16.811611,
      "lng": 99.138768
    },
    "course": 318.4,
    "speed": 79,
    "rpm": 1397,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:34:50",
    "location": {
      "lat": 16.81403,
      "lng": 99.136538
    },
    "course": 317.8,
    "speed": 80,
    "rpm": 1394,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:35:06",
    "location": {
      "lat": 16.816433,
      "lng": 99.134326
    },
    "course": 318.5,
    "speed": 80,
    "rpm": 1399,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:35:21",
    "location": {
      "lat": 16.818693,
      "lng": 99.132235
    },
    "course": 318.4,
    "speed": 79,
    "rpm": 1385,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:35:37",
    "location": {
      "lat": 16.821081,
      "lng": 99.130016
    },
    "course": 318.1,
    "speed": 79,
    "rpm": 1384,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:35:53",
    "location": {
      "lat": 16.823433,
      "lng": 99.127841
    },
    "course": 318.8,
    "speed": 77,
    "rpm": 1364,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:36:08",
    "location": {
      "lat": 16.82564,
      "lng": 99.125808
    },
    "course": 317.8,
    "speed": 78,
    "rpm": 1367,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:36:24",
    "location": {
      "lat": 16.827998,
      "lng": 99.123631
    },
    "course": 318.3,
    "speed": 77,
    "rpm": 1346,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:36:40",
    "location": {
      "lat": 16.83031,
      "lng": 99.121506
    },
    "course": 318.2,
    "speed": 76,
    "rpm": 1342,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:36:55",
    "location": {
      "lat": 16.832468,
      "lng": 99.119495
    },
    "course": 318.3,
    "speed": 76,
    "rpm": 1317,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 01:37:02",
    "location": {
      "lat": 16.833455,
      "lng": 99.118585
    },
    "course": 318.3,
    "speed": 74,
    "rpm": 1292,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:40:09",
    "location": {
      "lat": 16.833098,
      "lng": 99.09897
    },
    "course": 240,
    "speed": 75,
    "rpm": 1329,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:40:24",
    "location": {
      "lat": 16.831616,
      "lng": 99.096351
    },
    "course": 239.4,
    "speed": 79,
    "rpm": 1373,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:40:40",
    "location": {
      "lat": 16.83001,
      "lng": 99.0935
    },
    "course": 239.8,
    "speed": 80,
    "rpm": 1403,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:40:56",
    "location": {
      "lat": 16.828381,
      "lng": 99.090586
    },
    "course": 239.6,
    "speed": 80,
    "rpm": 1393,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:41:11",
    "location": {
      "lat": 16.826805,
      "lng": 99.087888
    },
    "course": 239.2,
    "speed": 81,
    "rpm": 1426,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:41:27",
    "location": {
      "lat": 16.825168,
      "lng": 99.085005
    },
    "course": 239.5,
    "speed": 80,
    "rpm": 1398,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:41:43",
    "location": {
      "lat": 16.823516,
      "lng": 99.082085
    },
    "course": 239.5,
    "speed": 80,
    "rpm": 1398,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:41:58",
    "location": {
      "lat": 16.821996,
      "lng": 99.079406
    },
    "course": 239.3,
    "speed": 77,
    "rpm": 1340,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:42:05",
    "location": {
      "lat": 16.821366,
      "lng": 99.078213
    },
    "course": 244.8,
    "speed": 72,
    "rpm": 1242,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:46:46",
    "location": {
      "lat": 16.80358,
      "lng": 99.043388
    },
    "course": 246,
    "speed": 5,
    "rpm": 972,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:47:02",
    "location": {
      "lat": 16.803448,
      "lng": 99.043085
    },
    "course": 243.1,
    "speed": 7,
    "rpm": 1256,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 01:47:18",
    "location": {
      "lat": 16.803303,
      "lng": 99.04275
    },
    "course": 245.5,
    "speed": 21,
    "rpm": 1904,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 01:47:33",
    "location": {
      "lat": 16.802826,
      "lng": 99.041643
    },
    "course": 245.2,
    "speed": 30,
    "rpm": 1469,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 01:47:47",
    "location": {
      "lat": 16.802268,
      "lng": 99.040355
    },
    "course": 246.3,
    "speed": 44,
    "rpm": 2089,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 01:47:49",
    "location": {
      "lat": 16.802178,
      "lng": 99.04014
    },
    "course": 246.3,
    "speed": 45,
    "rpm": 1585,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 01:47:50",
    "location": {
      "lat": 16.802131,
      "lng": 99.040031
    },
    "course": 246,
    "speed": 45,
    "rpm": 1516,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 01:48:05",
    "location": {
      "lat": 16.801363,
      "lng": 99.038218
    },
    "course": 247.8,
    "speed": 56,
    "rpm": 1872,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 01:48:20",
    "location": {
      "lat": 16.80048,
      "lng": 99.036201
    },
    "course": 246,
    "speed": 55,
    "rpm": 1336,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:48:36",
    "location": {
      "lat": 16.799576,
      "lng": 99.034153
    },
    "course": 240.9,
    "speed": 53,
    "rpm": 1301,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:48:37",
    "location": {
      "lat": 16.799506,
      "lng": 99.034033
    },
    "course": 238.8,
    "speed": 54,
    "rpm": 1307,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 01:48:51",
    "location": {
      "lat": 16.798186,
      "lng": 99.03248
    },
    "course": 216.5,
    "speed": 60,
    "rpm": 1462,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:49:06",
    "location": {
      "lat": 16.796148,
      "lng": 99.030958
    },
    "course": 215.9,
    "speed": 71,
    "rpm": 1721,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 01:49:22",
    "location": {
      "lat": 16.793958,
      "lng": 99.029296
    },
    "course": 218.9,
    "speed": 62,
    "rpm": 1487,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:49:38",
    "location": {
      "lat": 16.792438,
      "lng": 99.027201
    },
    "course": 246.5,
    "speed": 65,
    "rpm": 1567,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:49:53",
    "location": {
      "lat": 16.791901,
      "lng": 99.02477
    },
    "course": 260.2,
    "speed": 63,
    "rpm": 1116,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:50:09",
    "location": {
      "lat": 16.791488,
      "lng": 99.022208
    },
    "course": 261,
    "speed": 62,
    "rpm": 1090,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:50:25",
    "location": {
      "lat": 16.791046,
      "lng": 99.019436
    },
    "course": 261.2,
    "speed": 68,
    "rpm": 1648,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:50:40",
    "location": {
      "lat": 16.790678,
      "lng": 99.016838
    },
    "course": 267.6,
    "speed": 66,
    "rpm": 1605,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:50:46",
    "location": {
      "lat": 16.790756,
      "lng": 99.015793
    },
    "course": 280.7,
    "speed": 68,
    "rpm": 1644,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:50:51",
    "location": {
      "lat": 16.791006,
      "lng": 99.014926
    },
    "course": 292.1,
    "speed": 70,
    "rpm": 1722,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:50:53",
    "location": {
      "lat": 16.791161,
      "lng": 99.01459
    },
    "course": 297.5,
    "speed": 72,
    "rpm": 1738,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:50:59",
    "location": {
      "lat": 16.79179,
      "lng": 99.013651
    },
    "course": 311.7,
    "speed": 74,
    "rpm": 1780,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:04",
    "location": {
      "lat": 16.79248,
      "lng": 99.012996
    },
    "course": 320.9,
    "speed": 75,
    "rpm": 1813,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:15",
    "location": {
      "lat": 16.794103,
      "lng": 99.011621
    },
    "course": 321.3,
    "speed": 76,
    "rpm": 1828,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:30",
    "location": {
      "lat": 16.796345,
      "lng": 99.009735
    },
    "course": 319.9,
    "speed": 76,
    "rpm": 1588,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:46",
    "location": {
      "lat": 16.798236,
      "lng": 99.00729
    },
    "course": 301.8,
    "speed": 76,
    "rpm": 1341,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:51:56",
    "location": {
      "lat": 16.799226,
      "lng": 99.005613
    },
    "course": 301.8,
    "speed": 71,
    "rpm": 1247,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:52:02",
    "location": {
      "lat": 16.799776,
      "lng": 99.004696
    },
    "course": 302.3,
    "speed": 66,
    "rpm": 1143,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:52:17",
    "location": {
      "lat": 16.800961,
      "lng": 99.002706
    },
    "course": 301,
    "speed": 55,
    "rpm": 1324,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:52:33",
    "location": {
      "lat": 16.802065,
      "lng": 99.000771
    },
    "course": 295.5,
    "speed": 54,
    "rpm": 1307,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:52:49",
    "location": {
      "lat": 16.803065,
      "lng": 98.998545
    },
    "course": 306.3,
    "speed": 63,
    "rpm": 1536,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:53:04",
    "location": {
      "lat": 16.804705,
      "lng": 98.997011
    },
    "course": 330.5,
    "speed": 56,
    "rpm": 1368,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:10",
    "location": {
      "lat": 16.80552,
      "lng": 98.996625
    },
    "course": 331.9,
    "speed": 63,
    "rpm": 1540,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:11",
    "location": {
      "lat": 16.805656,
      "lng": 98.996536
    },
    "course": 326.9,
    "speed": 64,
    "rpm": 1580,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:12",
    "location": {
      "lat": 16.80579,
      "lng": 98.996435
    },
    "course": 321.9,
    "speed": 65,
    "rpm": 1599,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:14",
    "location": {
      "lat": 16.80603,
      "lng": 98.996195
    },
    "course": 312,
    "speed": 66,
    "rpm": 1619,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:16",
    "location": {
      "lat": 16.806231,
      "lng": 98.995918
    },
    "course": 304,
    "speed": 66,
    "rpm": 1603,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:21",
    "location": {
      "lat": 16.806678,
      "lng": 98.995225
    },
    "course": 308.9,
    "speed": 61,
    "rpm": 1474,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:22",
    "location": {
      "lat": 16.806783,
      "lng": 98.995108
    },
    "course": 314.6,
    "speed": 61,
    "rpm": 1456,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:23",
    "location": {
      "lat": 16.806896,
      "lng": 98.995003
    },
    "course": 319.6,
    "speed": 60,
    "rpm": 1437,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:25",
    "location": {
      "lat": 16.807136,
      "lng": 98.99482
    },
    "course": 326.9,
    "speed": 58,
    "rpm": 1401,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:27",
    "location": {
      "lat": 16.807395,
      "lng": 98.99468
    },
    "course": 335.5,
    "speed": 57,
    "rpm": 1377,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:31",
    "location": {
      "lat": 16.807911,
      "lng": 98.994425
    },
    "course": 328.4,
    "speed": 56,
    "rpm": 1377,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:32",
    "location": {
      "lat": 16.808028,
      "lng": 98.99434
    },
    "course": 323.2,
    "speed": 56,
    "rpm": 1365,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:33",
    "location": {
      "lat": 16.808135,
      "lng": 98.994245
    },
    "course": 317,
    "speed": 56,
    "rpm": 1358,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:34",
    "location": {
      "lat": 16.80823,
      "lng": 98.994138
    },
    "course": 311.5,
    "speed": 56,
    "rpm": 1633,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:36",
    "location": {
      "lat": 16.808396,
      "lng": 98.993906
    },
    "course": 303.5,
    "speed": 54,
    "rpm": 1833,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:53:45",
    "location": {
      "lat": 16.809015,
      "lng": 98.992816
    },
    "course": 293.1,
    "speed": 53,
    "rpm": 1794,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:46",
    "location": {
      "lat": 16.809056,
      "lng": 98.992685
    },
    "course": 285.9,
    "speed": 53,
    "rpm": 1789,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:47",
    "location": {
      "lat": 16.809081,
      "lng": 98.992548
    },
    "course": 279.2,
    "speed": 52,
    "rpm": 1779,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:48",
    "location": {
      "lat": 16.809091,
      "lng": 98.992411
    },
    "course": 272,
    "speed": 52,
    "rpm": 1744,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:49",
    "location": {
      "lat": 16.809085,
      "lng": 98.992278
    },
    "course": 265.2,
    "speed": 51,
    "rpm": 1725,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:53:50",
    "location": {
      "lat": 16.809063,
      "lng": 98.992146
    },
    "course": 258.8,
    "speed": 50,
    "rpm": 1688,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:53:51",
    "location": {
      "lat": 16.809031,
      "lng": 98.992021
    },
    "course": 253.5,
    "speed": 49,
    "rpm": 1641,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:53:55",
    "location": {
      "lat": 16.808898,
      "lng": 98.991551
    },
    "course": 258.7,
    "speed": 45,
    "rpm": 1500,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:53:57",
    "location": {
      "lat": 16.808875,
      "lng": 98.991321
    },
    "course": 267.9,
    "speed": 43,
    "rpm": 1450,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:53:59",
    "location": {
      "lat": 16.808883,
      "lng": 98.991096
    },
    "course": 275.6,
    "speed": 42,
    "rpm": 1419,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:54:01",
    "location": {
      "lat": 16.808923,
      "lng": 98.99088
    },
    "course": 284,
    "speed": 41,
    "rpm": 1389,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:54:03",
    "location": {
      "lat": 16.80899,
      "lng": 98.990676
    },
    "course": 292,
    "speed": 40,
    "rpm": 1364,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:54:12",
    "location": {
      "lat": 16.809358,
      "lng": 98.98981
    },
    "course": 287.5,
    "speed": 40,
    "rpm": 1360,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:54:16",
    "location": {
      "lat": 16.809433,
      "lng": 98.989396
    },
    "course": 274,
    "speed": 40,
    "rpm": 1356,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:54:18",
    "location": {
      "lat": 16.809433,
      "lng": 98.989186
    },
    "course": 267.6,
    "speed": 40,
    "rpm": 1339,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:54:25",
    "location": {
      "lat": 16.80942,
      "lng": 98.988465
    },
    "course": 275.5,
    "speed": 40,
    "rpm": 1358,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:40",
    "location": {
      "lat": 16.809836,
      "lng": 98.986748
    },
    "course": 278.7,
    "speed": 49,
    "rpm": 1690,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:41",
    "location": {
      "lat": 16.809846,
      "lng": 98.986618
    },
    "course": 273.2,
    "speed": 50,
    "rpm": 1691,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:42",
    "location": {
      "lat": 16.809845,
      "lng": 98.986486
    },
    "course": 267.4,
    "speed": 50,
    "rpm": 1697,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:43",
    "location": {
      "lat": 16.809831,
      "lng": 98.986356
    },
    "course": 262.4,
    "speed": 50,
    "rpm": 1681,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:44",
    "location": {
      "lat": 16.809806,
      "lng": 98.98623
    },
    "course": 257.1,
    "speed": 49,
    "rpm": 1669,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:46",
    "location": {
      "lat": 16.809733,
      "lng": 98.985991
    },
    "course": 249.5,
    "speed": 47,
    "rpm": 1576,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:54:58",
    "location": {
      "lat": 16.809326,
      "lng": 98.984905
    },
    "course": 253.9,
    "speed": 27,
    "rpm": 1472,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:55:04",
    "location": {
      "lat": 16.809285,
      "lng": 98.984731
    },
    "course": 265.3,
    "speed": 19,
    "rpm": 1768,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:55:19",
    "location": {
      "lat": 16.809295,
      "lng": 98.983981
    },
    "course": 287.3,
    "speed": 20,
    "rpm": 1816,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:55:27",
    "location": {
      "lat": 16.809516,
      "lng": 98.983383
    },
    "course": 302.6,
    "speed": 20,
    "rpm": 1826,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:55:40",
    "location": {
      "lat": 16.809956,
      "lng": 98.982805
    },
    "course": 310.3,
    "speed": 22,
    "rpm": 2069,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:55:42",
    "location": {
      "lat": 16.810035,
      "lng": 98.982713
    },
    "course": 310.4,
    "speed": 23,
    "rpm": 1816,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:55:44",
    "location": {
      "lat": 16.810105,
      "lng": 98.982628
    },
    "course": 311.3,
    "speed": 20,
    "rpm": 1303,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:55:55",
    "location": {
      "lat": 16.810308,
      "lng": 98.982385
    },
    "course": 303,
    "speed": 21,
    "rpm": 1377,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:55:58",
    "location": {
      "lat": 16.810553,
      "lng": 98.982025
    },
    "course": 294.9,
    "speed": 22,
    "rpm": 1426,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:00",
    "location": {
      "lat": 16.810593,
      "lng": 98.981916
    },
    "course": 289,
    "speed": 22,
    "rpm": 1444,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:02",
    "location": {
      "lat": 16.810625,
      "lng": 98.981803
    },
    "course": 283,
    "speed": 22,
    "rpm": 1453,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:04",
    "location": {
      "lat": 16.810643,
      "lng": 98.981685
    },
    "course": 277.6,
    "speed": 23,
    "rpm": 1474,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:06",
    "location": {
      "lat": 16.810653,
      "lng": 98.981565
    },
    "course": 272.3,
    "speed": 23,
    "rpm": 1498,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:08",
    "location": {
      "lat": 16.81065,
      "lng": 98.98144
    },
    "course": 267.2,
    "speed": 23,
    "rpm": 1512,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:10",
    "location": {
      "lat": 16.810635,
      "lng": 98.981315
    },
    "course": 261.1,
    "speed": 23,
    "rpm": 1531,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:12",
    "location": {
      "lat": 16.810608,
      "lng": 98.981193
    },
    "course": 254.9,
    "speed": 23,
    "rpm": 1531,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:21",
    "location": {
      "lat": 16.810483,
      "lng": 98.980851
    },
    "course": 259.1,
    "speed": 19,
    "rpm": 1750,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:26",
    "location": {
      "lat": 16.81042,
      "lng": 98.980425
    },
    "course": 270.8,
    "speed": 23,
    "rpm": 2020,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:27",
    "location": {
      "lat": 16.810421,
      "lng": 98.980363
    },
    "course": 273.1,
    "speed": 23,
    "rpm": 2044,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:28",
    "location": {
      "lat": 16.810426,
      "lng": 98.980303
    },
    "course": 276.5,
    "speed": 22,
    "rpm": 2032,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:30",
    "location": {
      "lat": 16.810448,
      "lng": 98.980185
    },
    "course": 282.3,
    "speed": 22,
    "rpm": 1971,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:56:31",
    "location": {
      "lat": 16.81046,
      "lng": 98.980128
    },
    "course": 285.4,
    "speed": 22,
    "rpm": 1908,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:32",
    "location": {
      "lat": 16.810476,
      "lng": 98.980071
    },
    "course": 289,
    "speed": 21,
    "rpm": 1933,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:34",
    "location": {
      "lat": 16.810515,
      "lng": 98.979963
    },
    "course": 295.1,
    "speed": 22,
    "rpm": 1931,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:36",
    "location": {
      "lat": 16.810566,
      "lng": 98.979861
    },
    "course": 300.8,
    "speed": 22,
    "rpm": 1959,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:38",
    "location": {
      "lat": 16.810635,
      "lng": 98.979768
    },
    "course": 311.3,
    "speed": 22,
    "rpm": 1986,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:40",
    "location": {
      "lat": 16.810716,
      "lng": 98.979686
    },
    "course": 317.3,
    "speed": 22,
    "rpm": 1996,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:56:42",
    "location": {
      "lat": 16.810803,
      "lng": 98.979606
    },
    "course": 318.9,
    "speed": 23,
    "rpm": 2018,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:56:48",
    "location": {
      "lat": 16.811078,
      "lng": 98.979386
    },
    "course": 323.4,
    "speed": 22,
    "rpm": 1981,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:56:55",
    "location": {
      "lat": 16.8114,
      "lng": 98.979148
    },
    "course": 324,
    "speed": 22,
    "rpm": 2058,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:56:58",
    "location": {
      "lat": 16.811541,
      "lng": 98.97904
    },
    "course": 323,
    "speed": 23,
    "rpm": 2051,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:57:04",
    "location": {
      "lat": 16.811818,
      "lng": 98.978823
    },
    "course": 323.6,
    "speed": 22,
    "rpm": 1997,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:57:07",
    "location": {
      "lat": 16.811956,
      "lng": 98.978718
    },
    "course": 322.3,
    "speed": 22,
    "rpm": 2048,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:57:11",
    "location": {
      "lat": 16.812125,
      "lng": 98.978561
    },
    "course": 314.3,
    "speed": 22,
    "rpm": 2042,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:57:14",
    "location": {
      "lat": 16.812243,
      "lng": 98.978431
    },
    "course": 310.3,
    "speed": 21,
    "rpm": 1885,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:57:27",
    "location": {
      "lat": 16.812561,
      "lng": 98.977943
    },
    "course": 299.3,
    "speed": 18,
    "rpm": 1644,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:57:42",
    "location": {
      "lat": 16.812875,
      "lng": 98.977375
    },
    "course": 299.2,
    "speed": 14,
    "rpm": 1781,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:57:58",
    "location": {
      "lat": 16.81315,
      "lng": 98.976815
    },
    "course": 290.1,
    "speed": 15,
    "rpm": 1888,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 01:58:14",
    "location": {
      "lat": 16.813265,
      "lng": 98.976188
    },
    "course": 270.2,
    "speed": 15,
    "rpm": 1975,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:58:29",
    "location": {
      "lat": 16.813226,
      "lng": 98.975575
    },
    "course": 267.6,
    "speed": 16,
    "rpm": 1985,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 01:58:45",
    "location": {
      "lat": 16.81325,
      "lng": 98.974925
    },
    "course": 274.6,
    "speed": 16,
    "rpm": 2034,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:59:01",
    "location": {
      "lat": 16.813296,
      "lng": 98.974288
    },
    "course": 271.2,
    "speed": 14,
    "rpm": 1849,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:59:07",
    "location": {
      "lat": 16.813293,
      "lng": 98.974048
    },
    "course": 275.3,
    "speed": 15,
    "rpm": 1872,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:59:15",
    "location": {
      "lat": 16.813301,
      "lng": 98.97374
    },
    "course": 267.1,
    "speed": 15,
    "rpm": 1865,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 01:59:30",
    "location": {
      "lat": 16.81327,
      "lng": 98.973135
    },
    "course": 266.4,
    "speed": 15,
    "rpm": 1938,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 01:59:45",
    "location": {
      "lat": 16.813283,
      "lng": 98.97252
    },
    "course": 280.7,
    "speed": 15,
    "rpm": 1932,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:00:01",
    "location": {
      "lat": 16.813531,
      "lng": 98.971918
    },
    "course": 304.9,
    "speed": 15,
    "rpm": 1937,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:00:17",
    "location": {
      "lat": 16.813961,
      "lng": 98.97144
    },
    "course": 312.5,
    "speed": 15,
    "rpm": 1916,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:00:25",
    "location": {
      "lat": 16.81414,
      "lng": 98.971178
    },
    "course": 296.6,
    "speed": 15,
    "rpm": 1946,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:00:41",
    "location": {
      "lat": 16.814233,
      "lng": 98.970533
    },
    "course": 261.2,
    "speed": 15,
    "rpm": 1913,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:00:56",
    "location": {
      "lat": 16.814038,
      "lng": 98.969956
    },
    "course": 248.3,
    "speed": 16,
    "rpm": 1976,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:01:03",
    "location": {
      "lat": 16.813943,
      "lng": 98.96969
    },
    "course": 256.3,
    "speed": 15,
    "rpm": 1895,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:06",
    "location": {
      "lat": 16.81392,
      "lng": 98.969571
    },
    "course": 262,
    "speed": 15,
    "rpm": 1910,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:15",
    "location": {
      "lat": 16.813926,
      "lng": 98.969195
    },
    "course": 279.6,
    "speed": 16,
    "rpm": 2055,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:18",
    "location": {
      "lat": 16.813955,
      "lng": 98.969071
    },
    "course": 283.9,
    "speed": 15,
    "rpm": 1893,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:21",
    "location": {
      "lat": 16.813985,
      "lng": 98.968956
    },
    "course": 282.6,
    "speed": 15,
    "rpm": 1899,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:25",
    "location": {
      "lat": 16.814008,
      "lng": 98.9688
    },
    "course": 273.7,
    "speed": 15,
    "rpm": 1909,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:27",
    "location": {
      "lat": 16.814008,
      "lng": 98.96872
    },
    "course": 268,
    "speed": 15,
    "rpm": 1924,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:34",
    "location": {
      "lat": 16.813968,
      "lng": 98.968446
    },
    "course": 255,
    "speed": 15,
    "rpm": 1930,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:01:49",
    "location": {
      "lat": 16.813766,
      "lng": 98.967878
    },
    "course": 247.8,
    "speed": 15,
    "rpm": 1892,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:05",
    "location": {
      "lat": 16.813541,
      "lng": 98.967278
    },
    "course": 249.1,
    "speed": 15,
    "rpm": 1910,
    "fuel": 111,
    "coolant": 101
  },
  {
    "gpsdate": "2020-05-02 02:02:11",
    "location": {
      "lat": 16.813455,
      "lng": 98.967048
    },
    "course": 250.1,
    "speed": 16,
    "rpm": 2056,
    "fuel": 111,
    "coolant": 101
  },
  {
    "gpsdate": "2020-05-02 02:02:16",
    "location": {
      "lat": 16.813395,
      "lng": 98.966846
    },
    "course": 255.9,
    "speed": 15,
    "rpm": 1981,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:20",
    "location": {
      "lat": 16.813366,
      "lng": 98.966676
    },
    "course": 262.1,
    "speed": 17,
    "rpm": 2067,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:20",
    "location": {
      "lat": 16.813366,
      "lng": 98.966676
    },
    "course": 262.1,
    "speed": 17,
    "rpm": 2068,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:27",
    "location": {
      "lat": 16.813363,
      "lng": 98.96637
    },
    "course": 273.5,
    "speed": 14,
    "rpm": 1287,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:36",
    "location": {
      "lat": 16.813388,
      "lng": 98.966116
    },
    "course": 270.8,
    "speed": 20,
    "rpm": 1937,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:37",
    "location": {
      "lat": 16.813388,
      "lng": 98.966116
    },
    "course": 267.9,
    "speed": 21,
    "rpm": 1960,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:39",
    "location": {
      "lat": 16.813385,
      "lng": 98.965786
    },
    "course": 262.6,
    "speed": 22,
    "rpm": 1991,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:40",
    "location": {
      "lat": 16.813375,
      "lng": 98.965726
    },
    "course": 260.2,
    "speed": 23,
    "rpm": 2045,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:02:42",
    "location": {
      "lat": 16.813348,
      "lng": 98.965608
    },
    "course": 254.8,
    "speed": 23,
    "rpm": 2075,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:02:44",
    "location": {
      "lat": 16.813303,
      "lng": 98.965488
    },
    "course": 248.6,
    "speed": 23,
    "rpm": 2134,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:02:46",
    "location": {
      "lat": 16.813251,
      "lng": 98.965375
    },
    "course": 243.1,
    "speed": 24,
    "rpm": 2177,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:02:48",
    "location": {
      "lat": 16.81319,
      "lng": 98.965263
    },
    "course": 237.8,
    "speed": 24,
    "rpm": 2211,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:50",
    "location": {
      "lat": 16.813118,
      "lng": 98.965163
    },
    "course": 231.5,
    "speed": 23,
    "rpm": 1504,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:51",
    "location": {
      "lat": 16.813081,
      "lng": 98.965116
    },
    "course": 229.3,
    "speed": 22,
    "rpm": 1471,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:53",
    "location": {
      "lat": 16.813,
      "lng": 98.96503
    },
    "course": 223.3,
    "speed": 24,
    "rpm": 1556,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:55",
    "location": {
      "lat": 16.812903,
      "lng": 98.964946
    },
    "course": 217.1,
    "speed": 25,
    "rpm": 1644,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:57",
    "location": {
      "lat": 16.812793,
      "lng": 98.964873
    },
    "course": 210.7,
    "speed": 26,
    "rpm": 1724,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:02:59",
    "location": {
      "lat": 16.812668,
      "lng": 98.964811
    },
    "course": 202.8,
    "speed": 27,
    "rpm": 1780,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:01",
    "location": {
      "lat": 16.812535,
      "lng": 98.964765
    },
    "course": 196.6,
    "speed": 28,
    "rpm": 1813,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:06",
    "location": {
      "lat": 16.812186,
      "lng": 98.964638
    },
    "course": 205.5,
    "speed": 30,
    "rpm": 1955,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:08",
    "location": {
      "lat": 16.812051,
      "lng": 98.964558
    },
    "course": 212.9,
    "speed": 31,
    "rpm": 2004,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:09",
    "location": {
      "lat": 16.811986,
      "lng": 98.96451
    },
    "course": 215.6,
    "speed": 31,
    "rpm": 2053,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:10",
    "location": {
      "lat": 16.811923,
      "lng": 98.96446
    },
    "course": 219.2,
    "speed": 32,
    "rpm": 2059,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:12",
    "location": {
      "lat": 16.811803,
      "lng": 98.964343
    },
    "course": 227.9,
    "speed": 32,
    "rpm": 2059,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:14",
    "location": {
      "lat": 16.811701,
      "lng": 98.964211
    },
    "course": 235.9,
    "speed": 32,
    "rpm": 2040,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:20",
    "location": {
      "lat": 16.81147,
      "lng": 98.96378
    },
    "course": 242,
    "speed": 30,
    "rpm": 1911,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:03:29",
    "location": {
      "lat": 16.811286,
      "lng": 98.96342
    },
    "course": 241.2,
    "speed": 18,
    "rpm": 1839,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:45",
    "location": {
      "lat": 16.810921,
      "lng": 98.962738
    },
    "course": 232.2,
    "speed": 15,
    "rpm": 1954,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:50",
    "location": {
      "lat": 16.810786,
      "lng": 98.962581
    },
    "course": 225,
    "speed": 16,
    "rpm": 2028,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:03:57",
    "location": {
      "lat": 16.810561,
      "lng": 98.962396
    },
    "course": 212.7,
    "speed": 15,
    "rpm": 1959,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:04:00",
    "location": {
      "lat": 16.81046,
      "lng": 98.962331
    },
    "course": 211.6,
    "speed": 15,
    "rpm": 1981,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:04:04",
    "location": {
      "lat": 16.810316,
      "lng": 98.962246
    },
    "course": 212.5,
    "speed": 16,
    "rpm": 2067,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:04:06",
    "location": {
      "lat": 16.810248,
      "lng": 98.962196
    },
    "course": 217.8,
    "speed": 16,
    "rpm": 2064,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:04:21",
    "location": {
      "lat": 16.809853,
      "lng": 98.961693
    },
    "course": 244.1,
    "speed": 16,
    "rpm": 2038,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:04:25",
    "location": {
      "lat": 16.80979,
      "lng": 98.961535
    },
    "course": 251.1,
    "speed": 16,
    "rpm": 1957,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:04:37",
    "location": {
      "lat": 16.80972,
      "lng": 98.96104
    },
    "course": 270.6,
    "speed": 15,
    "rpm": 1970,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:04:52",
    "location": {
      "lat": 16.80987,
      "lng": 98.960453
    },
    "course": 291.4,
    "speed": 15,
    "rpm": 1908,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:05:00",
    "location": {
      "lat": 16.80996,
      "lng": 98.960146
    },
    "course": 278.9,
    "speed": 15,
    "rpm": 1849,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:05:15",
    "location": {
      "lat": 16.809958,
      "lng": 98.959595
    },
    "course": 264.9,
    "speed": 13,
    "rpm": 1719,
    "fuel": 111,
    "coolant": 101
  },
  {
    "gpsdate": "2020-05-02 02:05:31",
    "location": {
      "lat": 16.809773,
      "lng": 98.95909
    },
    "course": 233.3,
    "speed": 11,
    "rpm": 1470,
    "fuel": 111,
    "coolant": 101
  },
  {
    "gpsdate": "2020-05-02 02:05:47",
    "location": {
      "lat": 16.809425,
      "lng": 98.95882
    },
    "course": 213.8,
    "speed": 10,
    "rpm": 1338,
    "fuel": 112,
    "coolant": 102
  },
  {
    "gpsdate": "2020-05-02 02:06:02",
    "location": {
      "lat": 16.809036,
      "lng": 98.958651
    },
    "course": 191.9,
    "speed": 12,
    "rpm": 1565,
    "fuel": 112,
    "coolant": 102
  },
  {
    "gpsdate": "2020-05-02 02:06:09",
    "location": {
      "lat": 16.808793,
      "lng": 98.95863
    },
    "course": 179.4,
    "speed": 15,
    "rpm": 1940,
    "fuel": 112,
    "coolant": 102
  },
  {
    "gpsdate": "2020-05-02 02:06:12",
    "location": {
      "lat": 16.808666,
      "lng": 98.958636
    },
    "course": 175,
    "speed": 16,
    "rpm": 2089,
    "fuel": 112,
    "coolant": 102
  },
  {
    "gpsdate": "2020-05-02 02:06:24",
    "location": {
      "lat": 16.808153,
      "lng": 98.958723
    },
    "course": 172.5,
    "speed": 17,
    "rpm": 2092,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:06:40",
    "location": {
      "lat": 16.807475,
      "lng": 98.958806
    },
    "course": 173,
    "speed": 16,
    "rpm": 2043,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:06:53",
    "location": {
      "lat": 16.806936,
      "lng": 98.958873
    },
    "course": 181.4,
    "speed": 16,
    "rpm": 2068,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:06:56",
    "location": {
      "lat": 16.806813,
      "lng": 98.958861
    },
    "course": 186.5,
    "speed": 15,
    "rpm": 1958,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:00",
    "location": {
      "lat": 16.806653,
      "lng": 98.95883
    },
    "course": 193.7,
    "speed": 16,
    "rpm": 2052,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:08",
    "location": {
      "lat": 16.806338,
      "lng": 98.958711
    },
    "course": 205.3,
    "speed": 16,
    "rpm": 2066,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:24",
    "location": {
      "lat": 16.805821,
      "lng": 98.95826
    },
    "course": 233.6,
    "speed": 17,
    "rpm": 2135,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:29",
    "location": {
      "lat": 16.805703,
      "lng": 98.95807
    },
    "course": 238.4,
    "speed": 15,
    "rpm": 1291,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:40",
    "location": {
      "lat": 16.805526,
      "lng": 98.957778
    },
    "course": 230.6,
    "speed": 20,
    "rpm": 1803,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:43",
    "location": {
      "lat": 16.80533,
      "lng": 98.957536
    },
    "course": 223.5,
    "speed": 21,
    "rpm": 1876,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:46",
    "location": {
      "lat": 16.805205,
      "lng": 98.957428
    },
    "course": 216,
    "speed": 22,
    "rpm": 1951,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:07:49",
    "location": {
      "lat": 16.805061,
      "lng": 98.957333
    },
    "course": 210.7,
    "speed": 23,
    "rpm": 2067,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:08:01",
    "location": {
      "lat": 16.80445,
      "lng": 98.956961
    },
    "course": 220.6,
    "speed": 21,
    "rpm": 1365,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:08:01",
    "location": {
      "lat": 16.80445,
      "lng": 98.956961
    },
    "course": 220.6,
    "speed": 21,
    "rpm": 1363,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:08:03",
    "location": {
      "lat": 16.804373,
      "lng": 98.956881
    },
    "course": 227.3,
    "speed": 21,
    "rpm": 1433,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:08:05",
    "location": {
      "lat": 16.80429,
      "lng": 98.9568
    },
    "course": 219.2,
    "speed": 23,
    "rpm": 1510,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:08:13",
    "location": {
      "lat": 16.803886,
      "lng": 98.956465
    },
    "course": 215.6,
    "speed": 27,
    "rpm": 1750,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:08:15",
    "location": {
      "lat": 16.803768,
      "lng": 98.956391
    },
    "course": 208.1,
    "speed": 27,
    "rpm": 1795,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:08:17",
    "location": {
      "lat": 16.803638,
      "lng": 98.95633
    },
    "course": 201.9,
    "speed": 28,
    "rpm": 1822,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:08:19",
    "location": {
      "lat": 16.803503,
      "lng": 98.956281
    },
    "course": 196.5,
    "speed": 28,
    "rpm": 1818,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:08:21",
    "location": {
      "lat": 16.803365,
      "lng": 98.95625
    },
    "course": 189.5,
    "speed": 28,
    "rpm": 1820,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:08:23",
    "location": {
      "lat": 16.803225,
      "lng": 98.956236
    },
    "course": 182.2,
    "speed": 27,
    "rpm": 1774,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:08:25",
    "location": {
      "lat": 16.803088,
      "lng": 98.956241
    },
    "course": 175.3,
    "speed": 27,
    "rpm": 1725,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:08:29",
    "location": {
      "lat": 16.80282,
      "lng": 98.956256
    },
    "course": 180.9,
    "speed": 26,
    "rpm": 1682,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:08:44",
    "location": {
      "lat": 16.80202,
      "lng": 98.956103
    },
    "course": 198.8,
    "speed": 18,
    "rpm": 1652,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:09:00",
    "location": {
      "lat": 16.801225,
      "lng": 98.955585
    },
    "course": 229.3,
    "speed": 22,
    "rpm": 2039,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:09:00",
    "location": {
      "lat": 16.801225,
      "lng": 98.955585
    },
    "course": 229.3,
    "speed": 22,
    "rpm": 2003,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:09:15",
    "location": {
      "lat": 16.800781,
      "lng": 98.954783
    },
    "course": 242.6,
    "speed": 24,
    "rpm": 2141,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:22",
    "location": {
      "lat": 16.80059,
      "lng": 98.954396
    },
    "course": 242,
    "speed": 21,
    "rpm": 1373,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:31",
    "location": {
      "lat": 16.80036,
      "lng": 98.953926
    },
    "course": 243,
    "speed": 23,
    "rpm": 1529,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:47",
    "location": {
      "lat": 16.79984,
      "lng": 98.952908
    },
    "course": 234.9,
    "speed": 31,
    "rpm": 2013,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:48",
    "location": {
      "lat": 16.79979,
      "lng": 98.952841
    },
    "course": 231,
    "speed": 31,
    "rpm": 2063,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:49",
    "location": {
      "lat": 16.799736,
      "lng": 98.952776
    },
    "course": 227.4,
    "speed": 32,
    "rpm": 2058,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:51",
    "location": {
      "lat": 16.799618,
      "lng": 98.952661
    },
    "course": 220.7,
    "speed": 32,
    "rpm": 2058,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:53",
    "location": {
      "lat": 16.799488,
      "lng": 98.95256
    },
    "course": 214.3,
    "speed": 31,
    "rpm": 2029,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:56",
    "location": {
      "lat": 16.799281,
      "lng": 98.952433
    },
    "course": 206.5,
    "speed": 31,
    "rpm": 2009,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:09:58",
    "location": {
      "lat": 16.799136,
      "lng": 98.952373
    },
    "course": 198.9,
    "speed": 30,
    "rpm": 1974,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:10:00",
    "location": {
      "lat": 16.798988,
      "lng": 98.952333
    },
    "course": 192.3,
    "speed": 30,
    "rpm": 1916,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:10:00",
    "location": {
      "lat": 16.798988,
      "lng": 98.952333
    },
    "course": 192.3,
    "speed": 30,
    "rpm": 1928,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:10:16",
    "location": {
      "lat": 16.798008,
      "lng": 98.952136
    },
    "course": 190.9,
    "speed": 19,
    "rpm": 1584,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:21",
    "location": {
      "lat": 16.797735,
      "lng": 98.952066
    },
    "course": 199.1,
    "speed": 18,
    "rpm": 1638,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:27",
    "location": {
      "lat": 16.797605,
      "lng": 98.952008
    },
    "course": 212.4,
    "speed": 19,
    "rpm": 1706,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:10:29",
    "location": {
      "lat": 16.797605,
      "lng": 98.952008
    },
    "course": 217.6,
    "speed": 19,
    "rpm": 1736,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:10:33",
    "location": {
      "lat": 16.797358,
      "lng": 98.951846
    },
    "course": 226.4,
    "speed": 20,
    "rpm": 1815,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:35",
    "location": {
      "lat": 16.797358,
      "lng": 98.951846
    },
    "course": 232.2,
    "speed": 20,
    "rpm": 1842,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:10:37",
    "location": {
      "lat": 16.79712,
      "lng": 98.951565
    },
    "course": 237.4,
    "speed": 21,
    "rpm": 1885,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:10:43",
    "location": {
      "lat": 16.796955,
      "lng": 98.951258
    },
    "course": 238,
    "speed": 23,
    "rpm": 2060,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:10:44",
    "location": {
      "lat": 16.79692,
      "lng": 98.951208
    },
    "course": 232.6,
    "speed": 23,
    "rpm": 2067,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:45",
    "location": {
      "lat": 16.796881,
      "lng": 98.951163
    },
    "course": 227.5,
    "speed": 23,
    "rpm": 2072,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:46",
    "location": {
      "lat": 16.796838,
      "lng": 98.951123
    },
    "course": 221.4,
    "speed": 23,
    "rpm": 2077,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:47",
    "location": {
      "lat": 16.796791,
      "lng": 98.951086
    },
    "course": 215,
    "speed": 23,
    "rpm": 2083,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:48",
    "location": {
      "lat": 16.796741,
      "lng": 98.951056
    },
    "course": 209.7,
    "speed": 23,
    "rpm": 2088,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:49",
    "location": {
      "lat": 16.79669,
      "lng": 98.95103
    },
    "course": 204,
    "speed": 23,
    "rpm": 2104,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:51",
    "location": {
      "lat": 16.796578,
      "lng": 98.950991
    },
    "course": 194.1,
    "speed": 23,
    "rpm": 2105,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:53",
    "location": {
      "lat": 16.796461,
      "lng": 98.950975
    },
    "course": 184.3,
    "speed": 23,
    "rpm": 2071,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:55",
    "location": {
      "lat": 16.796345,
      "lng": 98.950975
    },
    "course": 178,
    "speed": 23,
    "rpm": 2054,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:57",
    "location": {
      "lat": 16.79623,
      "lng": 98.950988
    },
    "course": 171.5,
    "speed": 22,
    "rpm": 2054,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:10:59",
    "location": {
      "lat": 16.796118,
      "lng": 98.951015
    },
    "course": 164.3,
    "speed": 23,
    "rpm": 2046,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:11:01",
    "location": {
      "lat": 16.79601,
      "lng": 98.951058
    },
    "course": 157.7,
    "speed": 22,
    "rpm": 2030,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:11:06",
    "location": {
      "lat": 16.795751,
      "lng": 98.95118
    },
    "course": 156.7,
    "speed": 21,
    "rpm": 1932,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:11:14",
    "location": {
      "lat": 16.79555,
      "lng": 98.951271
    },
    "course": 166.8,
    "speed": 19,
    "rpm": 1750,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:11:16",
    "location": {
      "lat": 16.795258,
      "lng": 98.95136
    },
    "course": 172.2,
    "speed": 19,
    "rpm": 1712,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:11:18",
    "location": {
      "lat": 16.795258,
      "lng": 98.95136
    },
    "course": 177.8,
    "speed": 19,
    "rpm": 1721,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:11:20",
    "location": {
      "lat": 16.795258,
      "lng": 98.95136
    },
    "course": 182.8,
    "speed": 19,
    "rpm": 1734,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:11:22",
    "location": {
      "lat": 16.794963,
      "lng": 98.951355
    },
    "course": 190.3,
    "speed": 19,
    "rpm": 1758,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:24",
    "location": {
      "lat": 16.794963,
      "lng": 98.951355
    },
    "course": 196.3,
    "speed": 20,
    "rpm": 1780,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:26",
    "location": {
      "lat": 16.794963,
      "lng": 98.951355
    },
    "course": 201.5,
    "speed": 20,
    "rpm": 1830,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:28",
    "location": {
      "lat": 16.794673,
      "lng": 98.951246
    },
    "course": 207,
    "speed": 21,
    "rpm": 1866,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:30",
    "location": {
      "lat": 16.794673,
      "lng": 98.951246
    },
    "course": 212.7,
    "speed": 21,
    "rpm": 1913,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:32",
    "location": {
      "lat": 16.794673,
      "lng": 98.951246
    },
    "course": 220.3,
    "speed": 22,
    "rpm": 1980,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:33",
    "location": {
      "lat": 16.794673,
      "lng": 98.951246
    },
    "course": 225.3,
    "speed": 22,
    "rpm": 2016,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:35",
    "location": {
      "lat": 16.794378,
      "lng": 98.950986
    },
    "course": 234.9,
    "speed": 22,
    "rpm": 2025,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:35",
    "location": {
      "lat": 16.794378,
      "lng": 98.950986
    },
    "course": 234.9,
    "speed": 22,
    "rpm": 2020,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:37",
    "location": {
      "lat": 16.79432,
      "lng": 98.950883
    },
    "course": 242.4,
    "speed": 22,
    "rpm": 2022,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:38",
    "location": {
      "lat": 16.794296,
      "lng": 98.950826
    },
    "course": 247.4,
    "speed": 23,
    "rpm": 2071,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:40",
    "location": {
      "lat": 16.794265,
      "lng": 98.950706
    },
    "course": 258.7,
    "speed": 24,
    "rpm": 2136,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:43",
    "location": {
      "lat": 16.794241,
      "lng": 98.950521
    },
    "course": 264.5,
    "speed": 22,
    "rpm": 1390,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:50",
    "location": {
      "lat": 16.794173,
      "lng": 98.950098
    },
    "course": 251.7,
    "speed": 25,
    "rpm": 1643,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:51",
    "location": {
      "lat": 16.794148,
      "lng": 98.950035
    },
    "course": 246,
    "speed": 26,
    "rpm": 1707,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:11:53",
    "location": {
      "lat": 16.794085,
      "lng": 98.94991
    },
    "course": 240.7,
    "speed": 27,
    "rpm": 1783,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:12:01",
    "location": {
      "lat": 16.79377,
      "lng": 98.949375
    },
    "course": 239.3,
    "speed": 31,
    "rpm": 2064,
    "fuel": 110,
    "coolant": 100
  },
  {
    "gpsdate": "2020-05-02 02:12:08",
    "location": {
      "lat": 16.793471,
      "lng": 98.948858
    },
    "course": 235.4,
    "speed": 33,
    "rpm": 2116,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:12:09",
    "location": {
      "lat": 16.793421,
      "lng": 98.94879
    },
    "course": 231.3,
    "speed": 33,
    "rpm": 2105,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:12:11",
    "location": {
      "lat": 16.793308,
      "lng": 98.948665
    },
    "course": 223.8,
    "speed": 32,
    "rpm": 2110,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:12:13",
    "location": {
      "lat": 16.793181,
      "lng": 98.948556
    },
    "course": 216.1,
    "speed": 32,
    "rpm": 2092,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:12:15",
    "location": {
      "lat": 16.79304,
      "lng": 98.948466
    },
    "course": 209.5,
    "speed": 33,
    "rpm": 2112,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:12:17",
    "location": {
      "lat": 16.792891,
      "lng": 98.948391
    },
    "course": 203.1,
    "speed": 32,
    "rpm": 2103,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:26",
    "location": {
      "lat": 16.792225,
      "lng": 98.948066
    },
    "course": 213.8,
    "speed": 33,
    "rpm": 2119,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:28",
    "location": {
      "lat": 16.792093,
      "lng": 98.947963
    },
    "course": 219,
    "speed": 32,
    "rpm": 1685,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:28",
    "location": {
      "lat": 16.792093,
      "lng": 98.947963
    },
    "course": 219,
    "speed": 32,
    "rpm": 1448,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:30",
    "location": {
      "lat": 16.791976,
      "lng": 98.947853
    },
    "course": 224.3,
    "speed": 31,
    "rpm": 1440,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:36",
    "location": {
      "lat": 16.791675,
      "lng": 98.947473
    },
    "course": 237.3,
    "speed": 32,
    "rpm": 1489,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:38",
    "location": {
      "lat": 16.791595,
      "lng": 98.947325
    },
    "course": 242.8,
    "speed": 33,
    "rpm": 1539,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:53",
    "location": {
      "lat": 16.791,
      "lng": 98.945856
    },
    "course": 243.5,
    "speed": 49,
    "rpm": 1754,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:54",
    "location": {
      "lat": 16.790936,
      "lng": 98.945741
    },
    "course": 239.1,
    "speed": 51,
    "rpm": 1775,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:55",
    "location": {
      "lat": 16.79086,
      "lng": 98.945628
    },
    "course": 234,
    "speed": 53,
    "rpm": 1820,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:56",
    "location": {
      "lat": 16.790771,
      "lng": 98.94552
    },
    "course": 228.1,
    "speed": 55,
    "rpm": 1876,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:57",
    "location": {
      "lat": 16.790671,
      "lng": 98.945418
    },
    "course": 222.2,
    "speed": 56,
    "rpm": 1908,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:58",
    "location": {
      "lat": 16.790558,
      "lng": 98.945328
    },
    "course": 216.1,
    "speed": 56,
    "rpm": 1928,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:12:59",
    "location": {
      "lat": 16.790436,
      "lng": 98.94525
    },
    "course": 209.8,
    "speed": 57,
    "rpm": 1930,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:00",
    "location": {
      "lat": 16.790306,
      "lng": 98.945186
    },
    "course": 203.4,
    "speed": 56,
    "rpm": 1913,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:01",
    "location": {
      "lat": 16.790173,
      "lng": 98.945138
    },
    "course": 196.9,
    "speed": 56,
    "rpm": 1899,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:02",
    "location": {
      "lat": 16.790035,
      "lng": 98.945106
    },
    "course": 190.7,
    "speed": 55,
    "rpm": 1867,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:03",
    "location": {
      "lat": 16.7899,
      "lng": 98.94509
    },
    "course": 185,
    "speed": 53,
    "rpm": 1804,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:04",
    "location": {
      "lat": 16.789766,
      "lng": 98.945086
    },
    "course": 179.5,
    "speed": 52,
    "rpm": 1744,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:06",
    "location": {
      "lat": 16.789516,
      "lng": 98.945108
    },
    "course": 173,
    "speed": 48,
    "rpm": 1626,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:21",
    "location": {
      "lat": 16.788218,
      "lng": 98.945318
    },
    "course": 174.7,
    "speed": 21,
    "rpm": 1794,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:37",
    "location": {
      "lat": 16.787591,
      "lng": 98.945258
    },
    "course": 199.7,
    "speed": 21,
    "rpm": 1915,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:53",
    "location": {
      "lat": 16.78663,
      "lng": 98.944701
    },
    "course": 218,
    "speed": 22,
    "rpm": 1966,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:13:58",
    "location": {
      "lat": 16.78641,
      "lng": 98.944515
    },
    "course": 220.4,
    "speed": 23,
    "rpm": 2097,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:14:02",
    "location": {
      "lat": 16.786233,
      "lng": 98.944351
    },
    "course": 223.2,
    "speed": 21,
    "rpm": 1387,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:04",
    "location": {
      "lat": 16.786156,
      "lng": 98.94427
    },
    "course": 229.2,
    "speed": 21,
    "rpm": 1414,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:15",
    "location": {
      "lat": 16.785768,
      "lng": 98.943615
    },
    "course": 234.4,
    "speed": 30,
    "rpm": 1977,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:14:17",
    "location": {
      "lat": 16.785666,
      "lng": 98.94349
    },
    "course": 226.1,
    "speed": 31,
    "rpm": 2041,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:14:19",
    "location": {
      "lat": 16.785548,
      "lng": 98.943381
    },
    "course": 217.3,
    "speed": 31,
    "rpm": 2008,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:14:20",
    "location": {
      "lat": 16.785481,
      "lng": 98.943335
    },
    "course": 212.3,
    "speed": 31,
    "rpm": 2032,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:21",
    "location": {
      "lat": 16.785411,
      "lng": 98.943296
    },
    "course": 206.9,
    "speed": 31,
    "rpm": 2039,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:23",
    "location": {
      "lat": 16.785265,
      "lng": 98.943233
    },
    "course": 198.9,
    "speed": 31,
    "rpm": 2060,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:25",
    "location": {
      "lat": 16.785108,
      "lng": 98.943193
    },
    "course": 189.6,
    "speed": 32,
    "rpm": 2050,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:26",
    "location": {
      "lat": 16.78503,
      "lng": 98.943185
    },
    "course": 184.5,
    "speed": 31,
    "rpm": 2032,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:28",
    "location": {
      "lat": 16.78487,
      "lng": 98.943188
    },
    "course": 174.6,
    "speed": 31,
    "rpm": 2043,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:14:32",
    "location": {
      "lat": 16.784561,
      "lng": 98.943233
    },
    "course": 172.7,
    "speed": 30,
    "rpm": 1942,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:34",
    "location": {
      "lat": 16.784406,
      "lng": 98.943246
    },
    "course": 178.9,
    "speed": 30,
    "rpm": 1931,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:35",
    "location": {
      "lat": 16.78433,
      "lng": 98.943241
    },
    "course": 184.6,
    "speed": 30,
    "rpm": 1966,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:36",
    "location": {
      "lat": 16.784253,
      "lng": 98.94323
    },
    "course": 190,
    "speed": 31,
    "rpm": 1978,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:38",
    "location": {
      "lat": 16.7841,
      "lng": 98.943185
    },
    "course": 200.3,
    "speed": 32,
    "rpm": 2054,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:40",
    "location": {
      "lat": 16.783958,
      "lng": 98.943113
    },
    "course": 209.6,
    "speed": 30,
    "rpm": 1388,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:42",
    "location": {
      "lat": 16.783835,
      "lng": 98.943026
    },
    "course": 217,
    "speed": 29,
    "rpm": 1369,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:44",
    "location": {
      "lat": 16.783723,
      "lng": 98.942921
    },
    "course": 224.8,
    "speed": 30,
    "rpm": 1394,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:14:59",
    "location": {
      "lat": 16.782943,
      "lng": 98.941956
    },
    "course": 229.8,
    "speed": 33,
    "rpm": 1567,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:08",
    "location": {
      "lat": 16.782423,
      "lng": 98.941355
    },
    "course": 220.1,
    "speed": 35,
    "rpm": 1642,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:09",
    "location": {
      "lat": 16.782351,
      "lng": 98.941301
    },
    "course": 214.4,
    "speed": 35,
    "rpm": 1641,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:10",
    "location": {
      "lat": 16.782275,
      "lng": 98.941255
    },
    "course": 209.1,
    "speed": 35,
    "rpm": 1643,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:12",
    "location": {
      "lat": 16.782115,
      "lng": 98.941181
    },
    "course": 200.4,
    "speed": 35,
    "rpm": 1639,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:14",
    "location": {
      "lat": 16.781946,
      "lng": 98.941133
    },
    "course": 192.7,
    "speed": 35,
    "rpm": 1648,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:16",
    "location": {
      "lat": 16.781771,
      "lng": 98.941106
    },
    "course": 184.3,
    "speed": 35,
    "rpm": 1656,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:18",
    "location": {
      "lat": 16.781595,
      "lng": 98.941106
    },
    "course": 177,
    "speed": 34,
    "rpm": 1627,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:22",
    "location": {
      "lat": 16.78125,
      "lng": 98.941131
    },
    "course": 181.9,
    "speed": 34,
    "rpm": 1593,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:24",
    "location": {
      "lat": 16.781076,
      "lng": 98.941106
    },
    "course": 191,
    "speed": 35,
    "rpm": 1632,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:25",
    "location": {
      "lat": 16.780991,
      "lng": 98.941083
    },
    "course": 196.1,
    "speed": 35,
    "rpm": 1658,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:27",
    "location": {
      "lat": 16.78082,
      "lng": 98.941015
    },
    "course": 204.5,
    "speed": 37,
    "rpm": 1730,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:29",
    "location": {
      "lat": 16.780655,
      "lng": 98.940916
    },
    "course": 213.6,
    "speed": 38,
    "rpm": 1820,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:31",
    "location": {
      "lat": 16.7805,
      "lng": 98.940785
    },
    "course": 223.2,
    "speed": 40,
    "rpm": 1892,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:32",
    "location": {
      "lat": 16.78043,
      "lng": 98.940706
    },
    "course": 228.4,
    "speed": 41,
    "rpm": 1923,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:33",
    "location": {
      "lat": 16.780365,
      "lng": 98.94062
    },
    "course": 234.1,
    "speed": 42,
    "rpm": 1970,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:34",
    "location": {
      "lat": 16.780308,
      "lng": 98.940525
    },
    "course": 239.9,
    "speed": 43,
    "rpm": 2024,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:37",
    "location": {
      "lat": 16.780145,
      "lng": 98.940216
    },
    "course": 236.7,
    "speed": 45,
    "rpm": 1429,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:38",
    "location": {
      "lat": 16.780073,
      "lng": 98.940123
    },
    "course": 230.6,
    "speed": 45,
    "rpm": 1545,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:39",
    "location": {
      "lat": 16.779993,
      "lng": 98.940035
    },
    "course": 223.9,
    "speed": 45,
    "rpm": 1545,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:40",
    "location": {
      "lat": 16.779905,
      "lng": 98.93996
    },
    "course": 217.7,
    "speed": 46,
    "rpm": 1562,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:41",
    "location": {
      "lat": 16.779806,
      "lng": 98.939891
    },
    "course": 211.8,
    "speed": 46,
    "rpm": 1580,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:43",
    "location": {
      "lat": 16.779595,
      "lng": 98.939781
    },
    "course": 203.4,
    "speed": 47,
    "rpm": 1620,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:45",
    "location": {
      "lat": 16.779366,
      "lng": 98.9397
    },
    "course": 197.1,
    "speed": 48,
    "rpm": 1629,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:47",
    "location": {
      "lat": 16.779141,
      "lng": 98.939598
    },
    "course": 208.8,
    "speed": 49,
    "rpm": 1667,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:48",
    "location": {
      "lat": 16.779038,
      "lng": 98.939525
    },
    "course": 217.1,
    "speed": 50,
    "rpm": 1708,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:49",
    "location": {
      "lat": 16.778943,
      "lng": 98.939433
    },
    "course": 225.2,
    "speed": 52,
    "rpm": 1740,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:50",
    "location": {
      "lat": 16.778858,
      "lng": 98.939328
    },
    "course": 232.1,
    "speed": 52,
    "rpm": 1801,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:57",
    "location": {
      "lat": 16.778245,
      "lng": 98.938478
    },
    "course": 228.7,
    "speed": 62,
    "rpm": 1528,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:58",
    "location": {
      "lat": 16.778131,
      "lng": 98.938361
    },
    "course": 223,
    "speed": 63,
    "rpm": 1539,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:15:59",
    "location": {
      "lat": 16.778006,
      "lng": 98.938256
    },
    "course": 217.7,
    "speed": 64,
    "rpm": 1548,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:16:01",
    "location": {
      "lat": 16.77774,
      "lng": 98.938073
    },
    "course": 211.7,
    "speed": 63,
    "rpm": 1522,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:16:15",
    "location": {
      "lat": 16.775963,
      "lng": 98.936946
    },
    "course": 203.6,
    "speed": 55,
    "rpm": 1842,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:16:16",
    "location": {
      "lat": 16.775835,
      "lng": 98.936898
    },
    "course": 198.6,
    "speed": 54,
    "rpm": 1814,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:16:18",
    "location": {
      "lat": 16.775576,
      "lng": 98.936833
    },
    "course": 189.7,
    "speed": 51,
    "rpm": 1716,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:16:29",
    "location": {
      "lat": 16.774551,
      "lng": 98.93673
    },
    "course": 190.4,
    "speed": 21,
    "rpm": 1815,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:16:44",
    "location": {
      "lat": 16.77402,
      "lng": 98.936535
    },
    "course": 208.3,
    "speed": 13,
    "rpm": 1731,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:16:48",
    "location": {
      "lat": 16.773891,
      "lng": 98.936463
    },
    "course": 209.2,
    "speed": 15,
    "rpm": 1886,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:17:03",
    "location": {
      "lat": 16.773375,
      "lng": 98.93616
    },
    "course": 209,
    "speed": 15,
    "rpm": 1919,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:17:19",
    "location": {
      "lat": 16.772876,
      "lng": 98.935766
    },
    "course": 228.5,
    "speed": 16,
    "rpm": 2009,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:17:31",
    "location": {
      "lat": 16.772616,
      "lng": 98.93535
    },
    "course": 244.5,
    "speed": 16,
    "rpm": 2033,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:17:34",
    "location": {
      "lat": 16.772568,
      "lng": 98.935231
    },
    "course": 248.9,
    "speed": 16,
    "rpm": 2037,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:17:38",
    "location": {
      "lat": 16.772521,
      "lng": 98.935071
    },
    "course": 256.4,
    "speed": 15,
    "rpm": 1888,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:17:45",
    "location": {
      "lat": 16.772475,
      "lng": 98.934783
    },
    "course": 263.4,
    "speed": 16,
    "rpm": 2044,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:17:50",
    "location": {
      "lat": 16.772453,
      "lng": 98.934568
    },
    "course": 264.2,
    "speed": 16,
    "rpm": 2048,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:17:55",
    "location": {
      "lat": 16.772431,
      "lng": 98.934355
    },
    "course": 263.8,
    "speed": 15,
    "rpm": 1980,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:02",
    "location": {
      "lat": 16.77239,
      "lng": 98.934063
    },
    "course": 259,
    "speed": 16,
    "rpm": 2000,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:05",
    "location": {
      "lat": 16.772361,
      "lng": 98.933945
    },
    "course": 253.2,
    "speed": 15,
    "rpm": 1866,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:05",
    "location": {
      "lat": 16.772361,
      "lng": 98.933945
    },
    "course": 253.2,
    "speed": 15,
    "rpm": 1870,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:20",
    "location": {
      "lat": 16.772075,
      "lng": 98.933436
    },
    "course": 228.7,
    "speed": 15,
    "rpm": 1888,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:31",
    "location": {
      "lat": 16.771735,
      "lng": 98.933161
    },
    "course": 209,
    "speed": 16,
    "rpm": 2031,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:18:36",
    "location": {
      "lat": 16.771546,
      "lng": 98.933068
    },
    "course": 201.7,
    "speed": 16,
    "rpm": 2063,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:18:38",
    "location": {
      "lat": 16.771468,
      "lng": 98.93304
    },
    "course": 196.1,
    "speed": 16,
    "rpm": 2084,
    "fuel": 109,
    "coolant": 99
  },
  {
    "gpsdate": "2020-05-02 02:18:53",
    "location": {
      "lat": 16.770846,
      "lng": 98.932925
    },
    "course": 186.3,
    "speed": 16,
    "rpm": 2092,
    "fuel": 108,
    "coolant": 98
  },
  {
    "gpsdate": "2020-05-02 02:19:00",
    "location": {
      "lat": 16.770546,
      "lng": 98.932886
    },
    "course": 189,
    "speed": 15,
    "rpm": 1309,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:19:08",
    "location": {
      "lat": 16.770303,
      "lng": 98.932841
    },
    "course": 191,
    "speed": 20,
    "rpm": 1941,
    "fuel": 107,
    "coolant": 97
  },
  {
    "gpsdate": "2020-05-02 02:19:11",
    "location": {
      "lat": 16.770303,
      "lng": 98.932841
    },
    "course": 190.3,
    "speed": 23,
    "rpm": 2141,
    "fuel": 106,
    "coolant": 96
  },
  {
    "gpsdate": "2020-05-02 02:19:24",
    "location": {
      "lat": 16.769265,
      "lng": 98.932646
    },
    "course": 190.5,
    "speed": 24,
    "rpm": 2152,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:30",
    "location": {
      "lat": 16.768908,
      "lng": 98.932563
    },
    "course": 197.8,
    "speed": 24,
    "rpm": 1871,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:32",
    "location": {
      "lat": 16.7688,
      "lng": 98.932521
    },
    "course": 202.4,
    "speed": 21,
    "rpm": 1351,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:44",
    "location": {
      "lat": 16.768211,
      "lng": 98.932105
    },
    "course": 226.7,
    "speed": 27,
    "rpm": 1752,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:46",
    "location": {
      "lat": 16.768121,
      "lng": 98.93199
    },
    "course": 234.2,
    "speed": 29,
    "rpm": 1851,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:51",
    "location": {
      "lat": 16.76793,
      "lng": 98.93164
    },
    "course": 247.3,
    "speed": 32,
    "rpm": 2048,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:51",
    "location": {
      "lat": 16.76793,
      "lng": 98.93164
    },
    "course": 247.3,
    "speed": 32,
    "rpm": 2041,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:53",
    "location": {
      "lat": 16.767881,
      "lng": 98.93148
    },
    "course": 254.9,
    "speed": 32,
    "rpm": 1924,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:55",
    "location": {
      "lat": 16.767853,
      "lng": 98.931323
    },
    "course": 262,
    "speed": 29,
    "rpm": 1820,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:19:55",
    "location": {
      "lat": 16.767853,
      "lng": 98.931323
    },
    "course": 262,
    "speed": 29,
    "rpm": 1852,
    "fuel": 105,
    "coolant": 95
  },
  {
    "gpsdate": "2020-05-02 02:20:01",
    "location": {
      "lat": 16.767846,
      "lng": 98.9309
    },
    "course": 276.1,
    "speed": 24,
    "rpm": 1548,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 02:20:03",
    "location": {
      "lat": 16.767868,
      "lng": 98.930781
    },
    "course": 282.4,
    "speed": 21,
    "rpm": 1267,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 02:20:18",
    "location": {
      "lat": 16.76791,
      "lng": 98.930636
    },
    "course": 287.5,
    "speed": 0,
    "rpm": 494,
    "fuel": 104,
    "coolant": 94
  },
  {
    "gpsdate": "2020-05-02 01:51:04",
    "location": {
      "lat": 16.79248,
      "lng": 99.012996
    },
    "course": 320.9,
    "speed": 75,
    "rpm": 1813,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:15",
    "location": {
      "lat": 16.794103,
      "lng": 99.011621
    },
    "course": 321.3,
    "speed": 76,
    "rpm": 1828,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:30",
    "location": {
      "lat": 16.796345,
      "lng": 99.009735
    },
    "course": 319.9,
    "speed": 76,
    "rpm": 1588,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 01:51:46",
    "location": {
      "lat": 16.798236,
      "lng": 99.00729
    },
    "course": 301.8,
    "speed": 76,
    "rpm": 1341,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 01:51:56",
    "location": {
      "lat": 16.799226,
      "lng": 99.005613
    },
    "course": 301.8,
    "speed": 71,
    "rpm": 1247,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:21:15",
    "location": {
      "lat": 16.767983,
      "lng": 98.930411
    },
    "course": 291,
    "speed": 15,
    "rpm": 1451,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:21:30",
    "location": {
      "lat": 16.768196,
      "lng": 98.929358
    },
    "course": 271.7,
    "speed": 39,
    "rpm": 1378,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:21:35",
    "location": {
      "lat": 16.76817,
      "lng": 98.92881
    },
    "course": 261.6,
    "speed": 44,
    "rpm": 1523,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:21:37",
    "location": {
      "lat": 16.768125,
      "lng": 98.928571
    },
    "course": 256.2,
    "speed": 47,
    "rpm": 1611,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:21:39",
    "location": {
      "lat": 16.768055,
      "lng": 98.92833
    },
    "course": 251.2,
    "speed": 49,
    "rpm": 1651,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:21:46",
    "location": {
      "lat": 16.767656,
      "lng": 98.927528
    },
    "course": 234.4,
    "speed": 49,
    "rpm": 1630,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:21:48",
    "location": {
      "lat": 16.767501,
      "lng": 98.927331
    },
    "course": 229.1,
    "speed": 48,
    "rpm": 1631,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:21:50",
    "location": {
      "lat": 16.767335,
      "lng": 98.927151
    },
    "course": 223.9,
    "speed": 47,
    "rpm": 1574,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:21:55",
    "location": {
      "lat": 16.766883,
      "lng": 98.92678
    },
    "course": 212.8,
    "speed": 45,
    "rpm": 1523,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:22:10",
    "location": {
      "lat": 16.765251,
      "lng": 98.925938
    },
    "course": 208.1,
    "speed": 54,
    "rpm": 1802,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:22:25",
    "location": {
      "lat": 16.763503,
      "lng": 98.924708
    },
    "course": 218.6,
    "speed": 58,
    "rpm": 1995,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 02:22:27",
    "location": {
      "lat": 16.763261,
      "lng": 98.924528
    },
    "course": 213.4,
    "speed": 59,
    "rpm": 1998,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 02:22:28",
    "location": {
      "lat": 16.763131,
      "lng": 98.924448
    },
    "course": 209.8,
    "speed": 60,
    "rpm": 2006,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:29",
    "location": {
      "lat": 16.762998,
      "lng": 98.924378
    },
    "course": 205.3,
    "speed": 60,
    "rpm": 2008,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:31",
    "location": {
      "lat": 16.762713,
      "lng": 98.924271
    },
    "course": 196.3,
    "speed": 60,
    "rpm": 1850,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:32",
    "location": {
      "lat": 16.762561,
      "lng": 98.924233
    },
    "course": 192.7,
    "speed": 63,
    "rpm": 1561,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:33",
    "location": {
      "lat": 16.762401,
      "lng": 98.9242
    },
    "course": 191.1,
    "speed": 65,
    "rpm": 1664,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:41",
    "location": {
      "lat": 16.76095,
      "lng": 98.923875
    },
    "course": 197.5,
    "speed": 79,
    "rpm": 1939,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:48",
    "location": {
      "lat": 16.75965,
      "lng": 98.923345
    },
    "course": 203.1,
    "speed": 74,
    "rpm": 1775,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:50",
    "location": {
      "lat": 16.759306,
      "lng": 98.923198
    },
    "course": 202.4,
    "speed": 73,
    "rpm": 1738,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:57",
    "location": {
      "lat": 16.758213,
      "lng": 98.92266
    },
    "course": 213.8,
    "speed": 67,
    "rpm": 1609,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 02:22:58",
    "location": {
      "lat": 16.758081,
      "lng": 98.922551
    },
    "course": 220.1,
    "speed": 67,
    "rpm": 1603,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 02:23:00",
    "location": {
      "lat": 16.757848,
      "lng": 98.922296
    },
    "course": 230.2,
    "speed": 67,
    "rpm": 1638,
    "fuel": 92,
    "coolant": 82
  },
  {
    "gpsdate": "2020-05-02 02:23:01",
    "location": {
      "lat": 16.757748,
      "lng": 98.922151
    },
    "course": 235.5,
    "speed": 69,
    "rpm": 1682,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:02",
    "location": {
      "lat": 16.75766,
      "lng": 98.921991
    },
    "course": 241.2,
    "speed": 71,
    "rpm": 1719,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:03",
    "location": {
      "lat": 16.757586,
      "lng": 98.92182
    },
    "course": 247.6,
    "speed": 72,
    "rpm": 1764,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:04",
    "location": {
      "lat": 16.75753,
      "lng": 98.921638
    },
    "course": 254,
    "speed": 73,
    "rpm": 1764,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:05",
    "location": {
      "lat": 16.757493,
      "lng": 98.921448
    },
    "course": 260.3,
    "speed": 73,
    "rpm": 1785,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:06",
    "location": {
      "lat": 16.757475,
      "lng": 98.921256
    },
    "course": 266.3,
    "speed": 74,
    "rpm": 1778,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:07",
    "location": {
      "lat": 16.757475,
      "lng": 98.921061
    },
    "course": 271.6,
    "speed": 74,
    "rpm": 1781,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:09",
    "location": {
      "lat": 16.757513,
      "lng": 98.92068
    },
    "course": 278,
    "speed": 72,
    "rpm": 1734,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:23:25",
    "location": {
      "lat": 16.757911,
      "lng": 98.918361
    },
    "course": 284.1,
    "speed": 40,
    "rpm": 1925,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:23:40",
    "location": {
      "lat": 16.758145,
      "lng": 98.917305
    },
    "course": 284.9,
    "speed": 21,
    "rpm": 1867,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:23:56",
    "location": {
      "lat": 16.758355,
      "lng": 98.916456
    },
    "course": 282.5,
    "speed": 22,
    "rpm": 1975,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:23:59",
    "location": {
      "lat": 16.758386,
      "lng": 98.916283
    },
    "course": 277.5,
    "speed": 23,
    "rpm": 2101,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:00",
    "location": {
      "lat": 16.758393,
      "lng": 98.916221
    },
    "course": 274.1,
    "speed": 23,
    "rpm": 2118,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:02",
    "location": {
      "lat": 16.758395,
      "lng": 98.916096
    },
    "course": 266.2,
    "speed": 24,
    "rpm": 2171,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:04",
    "location": {
      "lat": 16.75838,
      "lng": 98.915968
    },
    "course": 259.4,
    "speed": 25,
    "rpm": 2214,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:06",
    "location": {
      "lat": 16.758351,
      "lng": 98.915841
    },
    "course": 252.9,
    "speed": 25,
    "rpm": 2267,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:08",
    "location": {
      "lat": 16.758308,
      "lng": 98.915718
    },
    "course": 245.9,
    "speed": 24,
    "rpm": 1657,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:09",
    "location": {
      "lat": 16.758281,
      "lng": 98.915665
    },
    "course": 242.5,
    "speed": 23,
    "rpm": 1492,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:10",
    "location": {
      "lat": 16.758253,
      "lng": 98.915611
    },
    "course": 240,
    "speed": 23,
    "rpm": 1499,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:24:12",
    "location": {
      "lat": 16.758185,
      "lng": 98.91551
    },
    "course": 232.1,
    "speed": 24,
    "rpm": 1621,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:14",
    "location": {
      "lat": 16.758098,
      "lng": 98.915411
    },
    "course": 224.8,
    "speed": 26,
    "rpm": 1756,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:16",
    "location": {
      "lat": 16.75799,
      "lng": 98.91532
    },
    "course": 216,
    "speed": 28,
    "rpm": 1877,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:18",
    "location": {
      "lat": 16.757861,
      "lng": 98.91524
    },
    "course": 207.9,
    "speed": 30,
    "rpm": 1978,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:20",
    "location": {
      "lat": 16.757718,
      "lng": 98.915175
    },
    "course": 202.3,
    "speed": 32,
    "rpm": 2059,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:21",
    "location": {
      "lat": 16.757645,
      "lng": 98.915143
    },
    "course": 204.1,
    "speed": 32,
    "rpm": 2095,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:25",
    "location": {
      "lat": 16.757351,
      "lng": 98.91498
    },
    "course": 214.1,
    "speed": 34,
    "rpm": 2179,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:24:26",
    "location": {
      "lat": 16.757283,
      "lng": 98.914925
    },
    "course": 220.4,
    "speed": 34,
    "rpm": 2206,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:28",
    "location": {
      "lat": 16.75716,
      "lng": 98.914795
    },
    "course": 229.1,
    "speed": 34,
    "rpm": 1501,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:29",
    "location": {
      "lat": 16.757108,
      "lng": 98.914723
    },
    "course": 233.5,
    "speed": 33,
    "rpm": 1561,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:30",
    "location": {
      "lat": 16.757061,
      "lng": 98.91465
    },
    "course": 238.2,
    "speed": 33,
    "rpm": 1563,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:32",
    "location": {
      "lat": 16.756988,
      "lng": 98.91449
    },
    "course": 248.9,
    "speed": 34,
    "rpm": 1622,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:33",
    "location": {
      "lat": 16.756961,
      "lng": 98.914401
    },
    "course": 254.3,
    "speed": 35,
    "rpm": 1644,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:35",
    "location": {
      "lat": 16.756928,
      "lng": 98.914213
    },
    "course": 263.7,
    "speed": 36,
    "rpm": 1725,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:36",
    "location": {
      "lat": 16.756925,
      "lng": 98.914116
    },
    "course": 269.4,
    "speed": 37,
    "rpm": 1761,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:37",
    "location": {
      "lat": 16.756933,
      "lng": 98.914015
    },
    "course": 277,
    "speed": 39,
    "rpm": 1789,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:38",
    "location": {
      "lat": 16.756953,
      "lng": 98.913915
    },
    "course": 284.3,
    "speed": 39,
    "rpm": 1828,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:39",
    "location": {
      "lat": 16.756985,
      "lng": 98.913816
    },
    "course": 290.3,
    "speed": 40,
    "rpm": 1873,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:41",
    "location": {
      "lat": 16.757075,
      "lng": 98.913625
    },
    "course": 300.8,
    "speed": 42,
    "rpm": 1961,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:42",
    "location": {
      "lat": 16.757136,
      "lng": 98.913535
    },
    "course": 306.8,
    "speed": 43,
    "rpm": 1999,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:43",
    "location": {
      "lat": 16.75721,
      "lng": 98.91345
    },
    "course": 312.9,
    "speed": 43,
    "rpm": 2091,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:43",
    "location": {
      "lat": 16.75721,
      "lng": 98.91345
    },
    "course": 312.9,
    "speed": 43,
    "rpm": 2056,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:44",
    "location": {
      "lat": 16.757291,
      "lng": 98.913371
    },
    "course": 319.1,
    "speed": 45,
    "rpm": 2108,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:45",
    "location": {
      "lat": 16.757383,
      "lng": 98.9133
    },
    "course": 325.2,
    "speed": 45,
    "rpm": 1706,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:46",
    "location": {
      "lat": 16.75748,
      "lng": 98.913235
    },
    "course": 328.8,
    "speed": 45,
    "rpm": 1533,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:48",
    "location": {
      "lat": 16.757666,
      "lng": 98.913098
    },
    "course": 320.7,
    "speed": 46,
    "rpm": 1572,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:49",
    "location": {
      "lat": 16.75775,
      "lng": 98.913015
    },
    "course": 313.8,
    "speed": 46,
    "rpm": 1603,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:50",
    "location": {
      "lat": 16.757826,
      "lng": 98.91292
    },
    "course": 307.8,
    "speed": 47,
    "rpm": 1622,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:51",
    "location": {
      "lat": 16.757893,
      "lng": 98.912815
    },
    "course": 301.7,
    "speed": 48,
    "rpm": 1654,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:24:52",
    "location": {
      "lat": 16.75795,
      "lng": 98.912703
    },
    "course": 295.9,
    "speed": 49,
    "rpm": 1666,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:08",
    "location": {
      "lat": 16.758778,
      "lng": 98.910715
    },
    "course": 302.5,
    "speed": 50,
    "rpm": 1678,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:09",
    "location": {
      "lat": 16.758855,
      "lng": 98.910611
    },
    "course": 308.9,
    "speed": 50,
    "rpm": 1655,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:10",
    "location": {
      "lat": 16.758941,
      "lng": 98.910518
    },
    "course": 315.2,
    "speed": 49,
    "rpm": 1639,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:11",
    "location": {
      "lat": 16.759035,
      "lng": 98.910435
    },
    "course": 321.2,
    "speed": 49,
    "rpm": 1634,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:12",
    "location": {
      "lat": 16.759136,
      "lng": 98.91036
    },
    "course": 327.3,
    "speed": 49,
    "rpm": 1646,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:25:13",
    "location": {
      "lat": 16.759246,
      "lng": 98.9103
    },
    "course": 332.9,
    "speed": 49,
    "rpm": 1660,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:25:14",
    "location": {
      "lat": 16.759363,
      "lng": 98.91025
    },
    "course": 339,
    "speed": 50,
    "rpm": 1658,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:25:15",
    "location": {
      "lat": 16.759485,
      "lng": 98.910215
    },
    "course": 345.4,
    "speed": 50,
    "rpm": 1678,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:25:16",
    "location": {
      "lat": 16.759611,
      "lng": 98.91019
    },
    "course": 351.1,
    "speed": 51,
    "rpm": 1734,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:25:17",
    "location": {
      "lat": 16.759743,
      "lng": 98.910178
    },
    "course": 356.3,
    "speed": 52,
    "rpm": 1764,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:25:22",
    "location": {
      "lat": 16.76044,
      "lng": 98.910143
    },
    "course": 351.6,
    "speed": 56,
    "rpm": 1928,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:25:23",
    "location": {
      "lat": 16.760581,
      "lng": 98.910111
    },
    "course": 346.4,
    "speed": 58,
    "rpm": 1988,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:25:24",
    "location": {
      "lat": 16.760726,
      "lng": 98.910066
    },
    "course": 341.4,
    "speed": 60,
    "rpm": 2021,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:25:26",
    "location": {
      "lat": 16.761001,
      "lng": 98.909941
    },
    "course": 332.8,
    "speed": 59,
    "rpm": 1954,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:25:28",
    "location": {
      "lat": 16.761246,
      "lng": 98.90978
    },
    "course": 324,
    "speed": 57,
    "rpm": 1740,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:25:30",
    "location": {
      "lat": 16.761466,
      "lng": 98.909578
    },
    "course": 315.2,
    "speed": 59,
    "rpm": 1414,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:25:32",
    "location": {
      "lat": 16.761661,
      "lng": 98.90935
    },
    "course": 309.7,
    "speed": 58,
    "rpm": 1390,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:25:44",
    "location": {
      "lat": 16.762738,
      "lng": 98.907951
    },
    "course": 313.7,
    "speed": 56,
    "rpm": 1348,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:25:46",
    "location": {
      "lat": 16.762953,
      "lng": 98.907761
    },
    "course": 323.7,
    "speed": 56,
    "rpm": 1353,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:25:47",
    "location": {
      "lat": 16.763071,
      "lng": 98.907681
    },
    "course": 328.8,
    "speed": 56,
    "rpm": 1350,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:25:52",
    "location": {
      "lat": 16.763685,
      "lng": 98.907308
    },
    "course": 322.3,
    "speed": 55,
    "rpm": 1322,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:25:53",
    "location": {
      "lat": 16.763786,
      "lng": 98.907211
    },
    "course": 315.3,
    "speed": 54,
    "rpm": 1303,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:25:54",
    "location": {
      "lat": 16.763873,
      "lng": 98.907105
    },
    "course": 308,
    "speed": 54,
    "rpm": 1312,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:25:55",
    "location": {
      "lat": 16.763948,
      "lng": 98.906986
    },
    "course": 301.1,
    "speed": 54,
    "rpm": 1310,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:25:56",
    "location": {
      "lat": 16.76401,
      "lng": 98.90686
    },
    "course": 295.1,
    "speed": 54,
    "rpm": 1311,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:01",
    "location": {
      "lat": 16.764293,
      "lng": 98.906233
    },
    "course": 299.8,
    "speed": 52,
    "rpm": 1241,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:03",
    "location": {
      "lat": 16.764443,
      "lng": 98.906015
    },
    "course": 309.1,
    "speed": 51,
    "rpm": 1227,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:05",
    "location": {
      "lat": 16.764621,
      "lng": 98.905825
    },
    "course": 316.4,
    "speed": 51,
    "rpm": 1225,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:09",
    "location": {
      "lat": 16.764973,
      "lng": 98.905446
    },
    "course": 308.9,
    "speed": 50,
    "rpm": 1209,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:10",
    "location": {
      "lat": 16.765043,
      "lng": 98.90534
    },
    "course": 301.9,
    "speed": 49,
    "rpm": 1204,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:11",
    "location": {
      "lat": 16.765096,
      "lng": 98.905221
    },
    "course": 293.4,
    "speed": 49,
    "rpm": 1185,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:12",
    "location": {
      "lat": 16.76513,
      "lng": 98.9051
    },
    "course": 283.2,
    "speed": 48,
    "rpm": 1150,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:13",
    "location": {
      "lat": 16.765143,
      "lng": 98.904976
    },
    "course": 273.9,
    "speed": 47,
    "rpm": 1144,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:14",
    "location": {
      "lat": 16.76514,
      "lng": 98.904856
    },
    "course": 264.1,
    "speed": 46,
    "rpm": 1104,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:15",
    "location": {
      "lat": 16.765115,
      "lng": 98.90474
    },
    "course": 254.2,
    "speed": 45,
    "rpm": 1085,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:16",
    "location": {
      "lat": 16.765073,
      "lng": 98.904631
    },
    "course": 244.4,
    "speed": 44,
    "rpm": 1065,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:18",
    "location": {
      "lat": 16.764946,
      "lng": 98.904445
    },
    "course": 229,
    "speed": 43,
    "rpm": 1049,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:19",
    "location": {
      "lat": 16.764868,
      "lng": 98.904368
    },
    "course": 220.3,
    "speed": 43,
    "rpm": 1051,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:20",
    "location": {
      "lat": 16.76478,
      "lng": 98.904305
    },
    "course": 211.3,
    "speed": 43,
    "rpm": 1043,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:22",
    "location": {
      "lat": 16.764581,
      "lng": 98.904223
    },
    "course": 197.1,
    "speed": 42,
    "rpm": 1027,
    "fuel": 93,
    "coolant": 83
  },
  {
    "gpsdate": "2020-05-02 02:26:27",
    "location": {
      "lat": 16.76407,
      "lng": 98.904041
    },
    "course": 206.2,
    "speed": 44,
    "rpm": 1079,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:26:28",
    "location": {
      "lat": 16.763975,
      "lng": 98.90398
    },
    "course": 212.6,
    "speed": 45,
    "rpm": 1105,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:29",
    "location": {
      "lat": 16.763885,
      "lng": 98.90391
    },
    "course": 219,
    "speed": 45,
    "rpm": 1087,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:30",
    "location": {
      "lat": 16.7638,
      "lng": 98.903826
    },
    "course": 224.5,
    "speed": 46,
    "rpm": 1116,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:31",
    "location": {
      "lat": 16.763721,
      "lng": 98.903733
    },
    "course": 230.4,
    "speed": 47,
    "rpm": 1127,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:32",
    "location": {
      "lat": 16.763653,
      "lng": 98.903633
    },
    "course": 236.6,
    "speed": 47,
    "rpm": 1146,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:33",
    "location": {
      "lat": 16.763595,
      "lng": 98.903521
    },
    "course": 242.6,
    "speed": 48,
    "rpm": 1169,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:34",
    "location": {
      "lat": 16.763546,
      "lng": 98.903401
    },
    "course": 248.8,
    "speed": 49,
    "rpm": 1193,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:35",
    "location": {
      "lat": 16.763513,
      "lng": 98.903276
    },
    "course": 255.7,
    "speed": 50,
    "rpm": 1214,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:36",
    "location": {
      "lat": 16.763491,
      "lng": 98.903143
    },
    "course": 262.6,
    "speed": 51,
    "rpm": 1229,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:37",
    "location": {
      "lat": 16.763488,
      "lng": 98.903008
    },
    "course": 269.3,
    "speed": 52,
    "rpm": 1270,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:38",
    "location": {
      "lat": 16.763496,
      "lng": 98.90287
    },
    "course": 276.1,
    "speed": 54,
    "rpm": 1310,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:39",
    "location": {
      "lat": 16.763521,
      "lng": 98.90273
    },
    "course": 282.7,
    "speed": 55,
    "rpm": 1327,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:40",
    "location": {
      "lat": 16.763563,
      "lng": 98.902591
    },
    "course": 290,
    "speed": 55,
    "rpm": 1325,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:41",
    "location": {
      "lat": 16.763621,
      "lng": 98.902463
    },
    "course": 297.5,
    "speed": 55,
    "rpm": 1322,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:42",
    "location": {
      "lat": 16.763698,
      "lng": 98.902343
    },
    "course": 305.5,
    "speed": 56,
    "rpm": 1348,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:43",
    "location": {
      "lat": 16.76379,
      "lng": 98.90223
    },
    "course": 313.1,
    "speed": 57,
    "rpm": 1391,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:44",
    "location": {
      "lat": 16.7639,
      "lng": 98.902128
    },
    "course": 320.1,
    "speed": 59,
    "rpm": 1444,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:45",
    "location": {
      "lat": 16.764023,
      "lng": 98.902036
    },
    "course": 325.6,
    "speed": 61,
    "rpm": 1498,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:26:48",
    "location": {
      "lat": 16.764421,
      "lng": 98.901753
    },
    "course": 322.3,
    "speed": 65,
    "rpm": 1563,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:49",
    "location": {
      "lat": 16.764545,
      "lng": 98.901641
    },
    "course": 317.2,
    "speed": 64,
    "rpm": 1540,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:50",
    "location": {
      "lat": 16.764653,
      "lng": 98.90152
    },
    "course": 311.3,
    "speed": 63,
    "rpm": 1528,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:52",
    "location": {
      "lat": 16.764848,
      "lng": 98.901251
    },
    "course": 305.6,
    "speed": 65,
    "rpm": 1577,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:26:54",
    "location": {
      "lat": 16.765051,
      "lng": 98.900985
    },
    "course": 310.6,
    "speed": 64,
    "rpm": 1540,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:05",
    "location": {
      "lat": 16.766215,
      "lng": 98.899658
    },
    "course": 303.8,
    "speed": 59,
    "rpm": 1425,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:06",
    "location": {
      "lat": 16.766288,
      "lng": 98.899525
    },
    "course": 297.8,
    "speed": 59,
    "rpm": 1435,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:07",
    "location": {
      "lat": 16.766346,
      "lng": 98.89938
    },
    "course": 291.2,
    "speed": 60,
    "rpm": 1458,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:08",
    "location": {
      "lat": 16.766391,
      "lng": 98.89923
    },
    "course": 285.6,
    "speed": 60,
    "rpm": 1465,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:16",
    "location": {
      "lat": 16.766676,
      "lng": 98.897991
    },
    "course": 290.2,
    "speed": 59,
    "rpm": 1406,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:17",
    "location": {
      "lat": 16.766736,
      "lng": 98.897851
    },
    "course": 295.4,
    "speed": 59,
    "rpm": 1436,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:18",
    "location": {
      "lat": 16.766811,
      "lng": 98.897715
    },
    "course": 301.2,
    "speed": 60,
    "rpm": 1463,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:19",
    "location": {
      "lat": 16.766901,
      "lng": 98.897586
    },
    "course": 307.3,
    "speed": 61,
    "rpm": 1480,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:20",
    "location": {
      "lat": 16.767001,
      "lng": 98.897465
    },
    "course": 312.3,
    "speed": 62,
    "rpm": 1508,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:23",
    "location": {
      "lat": 16.767326,
      "lng": 98.897108
    },
    "course": 308.7,
    "speed": 63,
    "rpm": 1550,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:24",
    "location": {
      "lat": 16.767413,
      "lng": 98.89697
    },
    "course": 301,
    "speed": 63,
    "rpm": 1540,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:26",
    "location": {
      "lat": 16.767535,
      "lng": 98.896665
    },
    "course": 287.3,
    "speed": 62,
    "rpm": 1494,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:27:34",
    "location": {
      "lat": 16.767841,
      "lng": 98.89553
    },
    "course": 291.6,
    "speed": 50,
    "rpm": 1209,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:27:36",
    "location": {
      "lat": 16.767955,
      "lng": 98.895301
    },
    "course": 300.7,
    "speed": 48,
    "rpm": 1637,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:27:38",
    "location": {
      "lat": 16.76809,
      "lng": 98.895108
    },
    "course": 309,
    "speed": 44,
    "rpm": 1476,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:27:48",
    "location": {
      "lat": 16.768771,
      "lng": 98.894271
    },
    "course": 300.5,
    "speed": 41,
    "rpm": 1389,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:27:50",
    "location": {
      "lat": 16.768861,
      "lng": 98.894075
    },
    "course": 291.8,
    "speed": 42,
    "rpm": 1427,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:27:51",
    "location": {
      "lat": 16.768893,
      "lng": 98.89397
    },
    "course": 286.4,
    "speed": 42,
    "rpm": 1423,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:27:52",
    "location": {
      "lat": 16.768916,
      "lng": 98.893861
    },
    "course": 281.3,
    "speed": 42,
    "rpm": 1423,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:27:54",
    "location": {
      "lat": 16.768936,
      "lng": 98.893636
    },
    "course": 271.8,
    "speed": 43,
    "rpm": 1478,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:27:56",
    "location": {
      "lat": 16.768925,
      "lng": 98.893405
    },
    "course": 263.6,
    "speed": 44,
    "rpm": 1486,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:27:58",
    "location": {
      "lat": 16.768888,
      "lng": 98.893173
    },
    "course": 258,
    "speed": 46,
    "rpm": 1544,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:08",
    "location": {
      "lat": 16.7686,
      "lng": 98.891936
    },
    "course": 250.3,
    "speed": 51,
    "rpm": 1716,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:16",
    "location": {
      "lat": 16.768218,
      "lng": 98.890923
    },
    "course": 254.5,
    "speed": 51,
    "rpm": 1706,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:17",
    "location": {
      "lat": 16.768191,
      "lng": 98.890793
    },
    "course": 259.7,
    "speed": 51,
    "rpm": 1706,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:18",
    "location": {
      "lat": 16.768176,
      "lng": 98.890656
    },
    "course": 266,
    "speed": 51,
    "rpm": 1732,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:19",
    "location": {
      "lat": 16.768175,
      "lng": 98.890516
    },
    "course": 272.7,
    "speed": 52,
    "rpm": 1751,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:20",
    "location": {
      "lat": 16.768191,
      "lng": 98.890381
    },
    "course": 279.5,
    "speed": 52,
    "rpm": 1773,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:21",
    "location": {
      "lat": 16.768223,
      "lng": 98.890248
    },
    "course": 286.4,
    "speed": 53,
    "rpm": 1788,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:28:22",
    "location": {
      "lat": 16.768271,
      "lng": 98.890115
    },
    "course": 293.4,
    "speed": 53,
    "rpm": 1802,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:23",
    "location": {
      "lat": 16.768335,
      "lng": 98.889991
    },
    "course": 300.3,
    "speed": 54,
    "rpm": 1831,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:24",
    "location": {
      "lat": 16.768413,
      "lng": 98.889873
    },
    "course": 306.6,
    "speed": 55,
    "rpm": 1842,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:25",
    "location": {
      "lat": 16.768503,
      "lng": 98.889765
    },
    "course": 311.6,
    "speed": 55,
    "rpm": 1816,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:28",
    "location": {
      "lat": 16.768765,
      "lng": 98.889443
    },
    "course": 305.5,
    "speed": 53,
    "rpm": 1822,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:29",
    "location": {
      "lat": 16.768835,
      "lng": 98.889323
    },
    "course": 299.8,
    "speed": 55,
    "rpm": 1883,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:30",
    "location": {
      "lat": 16.768895,
      "lng": 98.88919
    },
    "course": 293.6,
    "speed": 57,
    "rpm": 1911,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:31",
    "location": {
      "lat": 16.768943,
      "lng": 98.889048
    },
    "course": 287.2,
    "speed": 58,
    "rpm": 1960,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:32",
    "location": {
      "lat": 16.768976,
      "lng": 98.8889
    },
    "course": 281.6,
    "speed": 59,
    "rpm": 1978,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:33",
    "location": {
      "lat": 16.768996,
      "lng": 98.888748
    },
    "course": 276.1,
    "speed": 58,
    "rpm": 1957,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:34",
    "location": {
      "lat": 16.769001,
      "lng": 98.888596
    },
    "course": 270.2,
    "speed": 58,
    "rpm": 1933,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:35",
    "location": {
      "lat": 16.768991,
      "lng": 98.888448
    },
    "course": 264,
    "speed": 56,
    "rpm": 1875,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:36",
    "location": {
      "lat": 16.768968,
      "lng": 98.888305
    },
    "course": 258.6,
    "speed": 55,
    "rpm": 1860,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:39",
    "location": {
      "lat": 16.768878,
      "lng": 98.887883
    },
    "course": 260.4,
    "speed": 54,
    "rpm": 1847,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:28:54",
    "location": {
      "lat": 16.768756,
      "lng": 98.88612
    },
    "course": 266.5,
    "speed": 36,
    "rpm": 1134,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:06",
    "location": {
      "lat": 16.768703,
      "lng": 98.8852
    },
    "course": 266.9,
    "speed": 33,
    "rpm": 2073,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:10",
    "location": {
      "lat": 16.768685,
      "lng": 98.884868
    },
    "course": 265.8,
    "speed": 29,
    "rpm": 1912,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:10",
    "location": {
      "lat": 16.768685,
      "lng": 98.884868
    },
    "course": 265.8,
    "speed": 29,
    "rpm": 1991,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:14",
    "location": {
      "lat": 16.768668,
      "lng": 98.884525
    },
    "course": 267.4,
    "speed": 34,
    "rpm": 2139,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:29:16",
    "location": {
      "lat": 16.76867,
      "lng": 98.88435
    },
    "course": 273.1,
    "speed": 32,
    "rpm": 2036,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:29:18",
    "location": {
      "lat": 16.768686,
      "lng": 98.884181
    },
    "course": 278.7,
    "speed": 33,
    "rpm": 2120,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:20",
    "location": {
      "lat": 16.76873,
      "lng": 98.884006
    },
    "course": 289.3,
    "speed": 36,
    "rpm": 2206,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:21",
    "location": {
      "lat": 16.768763,
      "lng": 98.883921
    },
    "course": 294.3,
    "speed": 34,
    "rpm": 2110,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:29:23",
    "location": {
      "lat": 16.768841,
      "lng": 98.883775
    },
    "course": 301.5,
    "speed": 31,
    "rpm": 1967,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:29:26",
    "location": {
      "lat": 16.768961,
      "lng": 98.883551
    },
    "course": 295.7,
    "speed": 33,
    "rpm": 2078,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:28",
    "location": {
      "lat": 16.769016,
      "lng": 98.88339
    },
    "course": 285.1,
    "speed": 33,
    "rpm": 2088,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:29",
    "location": {
      "lat": 16.76903,
      "lng": 98.883303
    },
    "course": 278.2,
    "speed": 33,
    "rpm": 2238,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:30",
    "location": {
      "lat": 16.769033,
      "lng": 98.883213
    },
    "course": 271.5,
    "speed": 35,
    "rpm": 2185,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:31",
    "location": {
      "lat": 16.769031,
      "lng": 98.883123
    },
    "course": 265.9,
    "speed": 34,
    "rpm": 2128,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:32",
    "location": {
      "lat": 16.76902,
      "lng": 98.883036
    },
    "course": 260,
    "speed": 33,
    "rpm": 2063,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:33",
    "location": {
      "lat": 16.769,
      "lng": 98.882953
    },
    "course": 255,
    "speed": 32,
    "rpm": 2057,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:34",
    "location": {
      "lat": 16.768971,
      "lng": 98.882871
    },
    "course": 248.2,
    "speed": 32,
    "rpm": 2106,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:35",
    "location": {
      "lat": 16.768933,
      "lng": 98.882793
    },
    "course": 242.4,
    "speed": 34,
    "rpm": 2245,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:49",
    "location": {
      "lat": 16.768196,
      "lng": 98.881826
    },
    "course": 228.5,
    "speed": 30,
    "rpm": 1935,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:51",
    "location": {
      "lat": 16.768095,
      "lng": 98.881708
    },
    "course": 227.4,
    "speed": 31,
    "rpm": 1958,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:55",
    "location": {
      "lat": 16.767875,
      "lng": 98.881491
    },
    "course": 218.2,
    "speed": 27,
    "rpm": 1641,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:57",
    "location": {
      "lat": 16.767775,
      "lng": 98.881423
    },
    "course": 211.5,
    "speed": 21,
    "rpm": 1306,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:29:59",
    "location": {
      "lat": 16.767775,
      "lng": 98.881423
    },
    "course": 205.8,
    "speed": 17,
    "rpm": 915,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:30:04",
    "location": {
      "lat": 16.767506,
      "lng": 98.88131
    },
    "course": 198.8,
    "speed": 16,
    "rpm": 2080,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:30:14",
    "location": {
      "lat": 16.767085,
      "lng": 98.881188
    },
    "course": 196.6,
    "speed": 16,
    "rpm": 2093,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:30:30",
    "location": {
      "lat": 16.766418,
      "lng": 98.880988
    },
    "course": 197.3,
    "speed": 17,
    "rpm": 2244,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:30:45",
    "location": {
      "lat": 16.765808,
      "lng": 98.880748
    },
    "course": 206.4,
    "speed": 16,
    "rpm": 1982,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:31:01",
    "location": {
      "lat": 16.765206,
      "lng": 98.880356
    },
    "course": 212.3,
    "speed": 18,
    "rpm": 2142,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:31:17",
    "location": {
      "lat": 16.764568,
      "lng": 98.880048
    },
    "course": 196.7,
    "speed": 18,
    "rpm": 2235,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:31:25",
    "location": {
      "lat": 16.764235,
      "lng": 98.87993
    },
    "course": 205.8,
    "speed": 17,
    "rpm": 2115,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:31:41",
    "location": {
      "lat": 16.763681,
      "lng": 98.879458
    },
    "course": 232.4,
    "speed": 16,
    "rpm": 2022,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:31:56",
    "location": {
      "lat": 16.763346,
      "lng": 98.878836
    },
    "course": 241.4,
    "speed": 17,
    "rpm": 2279,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:32:12",
    "location": {
      "lat": 16.763066,
      "lng": 98.878078
    },
    "course": 261.1,
    "speed": 25,
    "rpm": 2129,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:32:26",
    "location": {
      "lat": 16.762998,
      "lng": 98.877193
    },
    "course": 258.5,
    "speed": 26,
    "rpm": 1929,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:32:27",
    "location": {
      "lat": 16.76298,
      "lng": 98.877121
    },
    "course": 255,
    "speed": 29,
    "rpm": 1976,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:32:29",
    "location": {
      "lat": 16.762926,
      "lng": 98.876965
    },
    "course": 246.1,
    "speed": 33,
    "rpm": 2159,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:32:30",
    "location": {
      "lat": 16.76289,
      "lng": 98.876883
    },
    "course": 243.8,
    "speed": 34,
    "rpm": 2178,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:32:35",
    "location": {
      "lat": 16.762643,
      "lng": 98.87648
    },
    "course": 232.7,
    "speed": 41,
    "rpm": 1555,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:44",
    "location": {
      "lat": 16.761878,
      "lng": 98.875508
    },
    "course": 230.8,
    "speed": 60,
    "rpm": 2060,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:45",
    "location": {
      "lat": 16.761778,
      "lng": 98.875385
    },
    "course": 229.5,
    "speed": 60,
    "rpm": 2146,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:47",
    "location": {
      "lat": 16.761555,
      "lng": 98.875146
    },
    "course": 223.3,
    "speed": 65,
    "rpm": 2199,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:49",
    "location": {
      "lat": 16.7613,
      "lng": 98.874931
    },
    "course": 217.4,
    "speed": 65,
    "rpm": 2167,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:51",
    "location": {
      "lat": 16.761051,
      "lng": 98.874713
    },
    "course": 223.3,
    "speed": 64,
    "rpm": 2143,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:53",
    "location": {
      "lat": 16.760836,
      "lng": 98.874456
    },
    "course": 233.5,
    "speed": 65,
    "rpm": 2204,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:54",
    "location": {
      "lat": 16.760746,
      "lng": 98.874311
    },
    "course": 239.4,
    "speed": 66,
    "rpm": 2198,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:55",
    "location": {
      "lat": 16.760673,
      "lng": 98.874156
    },
    "course": 245.4,
    "speed": 66,
    "rpm": 2183,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:56",
    "location": {
      "lat": 16.760615,
      "lng": 98.873996
    },
    "course": 251.3,
    "speed": 65,
    "rpm": 2175,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:57",
    "location": {
      "lat": 16.760573,
      "lng": 98.873833
    },
    "course": 257.3,
    "speed": 64,
    "rpm": 2173,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:58",
    "location": {
      "lat": 16.760548,
      "lng": 98.873668
    },
    "course": 262.8,
    "speed": 64,
    "rpm": 2160,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:32:59",
    "location": {
      "lat": 16.760536,
      "lng": 98.873501
    },
    "course": 267.9,
    "speed": 63,
    "rpm": 2134,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:33:01",
    "location": {
      "lat": 16.760551,
      "lng": 98.873175
    },
    "course": 276.4,
    "speed": 61,
    "rpm": 2058,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:33:03",
    "location": {
      "lat": 16.760611,
      "lng": 98.872871
    },
    "course": 285.2,
    "speed": 57,
    "rpm": 1940,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:33:04",
    "location": {
      "lat": 16.760658,
      "lng": 98.87273
    },
    "course": 289.9,
    "speed": 56,
    "rpm": 1847,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:33:05",
    "location": {
      "lat": 16.760716,
      "lng": 98.872596
    },
    "course": 294.7,
    "speed": 54,
    "rpm": 1796,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:33:07",
    "location": {
      "lat": 16.760848,
      "lng": 98.872366
    },
    "course": 304.8,
    "speed": 49,
    "rpm": 1642,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:33:09",
    "location": {
      "lat": 16.760996,
      "lng": 98.872176
    },
    "course": 311.8,
    "speed": 44,
    "rpm": 2127,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:33:16",
    "location": {
      "lat": 16.761438,
      "lng": 98.871685
    },
    "course": 306.1,
    "speed": 31,
    "rpm": 1426,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:33:18",
    "location": {
      "lat": 16.761511,
      "lng": 98.871556
    },
    "course": 296.7,
    "speed": 27,
    "rpm": 1250,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:20",
    "location": {
      "lat": 16.761555,
      "lng": 98.871443
    },
    "course": 288.9,
    "speed": 20,
    "rpm": 1766,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:22",
    "location": {
      "lat": 16.761576,
      "lng": 98.871346
    },
    "course": 282.3,
    "speed": 18,
    "rpm": 1606,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:25",
    "location": {
      "lat": 16.761596,
      "lng": 98.871208
    },
    "course": 274.7,
    "speed": 17,
    "rpm": 1596,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:27",
    "location": {
      "lat": 16.761595,
      "lng": 98.871115
    },
    "course": 266.4,
    "speed": 17,
    "rpm": 1603,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:33:29",
    "location": {
      "lat": 16.761585,
      "lng": 98.871021
    },
    "course": 261.2,
    "speed": 18,
    "rpm": 1617,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:33:40",
    "location": {
      "lat": 16.761513,
      "lng": 98.870441
    },
    "course": 269.4,
    "speed": 23,
    "rpm": 2047,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:40",
    "location": {
      "lat": 16.761513,
      "lng": 98.870441
    },
    "course": 269.4,
    "speed": 23,
    "rpm": 2064,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:41",
    "location": {
      "lat": 16.761516,
      "lng": 98.87038
    },
    "course": 274.4,
    "speed": 23,
    "rpm": 2049,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:43",
    "location": {
      "lat": 16.761535,
      "lng": 98.870258
    },
    "course": 281.4,
    "speed": 24,
    "rpm": 2101,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:45",
    "location": {
      "lat": 16.761568,
      "lng": 98.870135
    },
    "course": 288.8,
    "speed": 24,
    "rpm": 1935,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:46",
    "location": {
      "lat": 16.76159,
      "lng": 98.870076
    },
    "course": 292.6,
    "speed": 24,
    "rpm": 1501,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:47",
    "location": {
      "lat": 16.761615,
      "lng": 98.87002
    },
    "course": 295.3,
    "speed": 23,
    "rpm": 1547,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:33:57",
    "location": {
      "lat": 16.76193,
      "lng": 98.869436
    },
    "course": 295,
    "speed": 27,
    "rpm": 1771,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:33:59",
    "location": {
      "lat": 16.761983,
      "lng": 98.869298
    },
    "course": 288.9,
    "speed": 28,
    "rpm": 1821,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:34:01",
    "location": {
      "lat": 16.76202,
      "lng": 98.86915
    },
    "course": 282.2,
    "speed": 30,
    "rpm": 1936,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:34:03",
    "location": {
      "lat": 16.762045,
      "lng": 98.868996
    },
    "course": 276.5,
    "speed": 28,
    "rpm": 1781,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:34:05",
    "location": {
      "lat": 16.76205,
      "lng": 98.868851
    },
    "course": 268.5,
    "speed": 27,
    "rpm": 1713,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:34:20",
    "location": {
      "lat": 16.76195,
      "lng": 98.867716
    },
    "course": 263.4,
    "speed": 28,
    "rpm": 1794,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:25",
    "location": {
      "lat": 16.76189,
      "lng": 98.867338
    },
    "course": 253.8,
    "speed": 28,
    "rpm": 1760,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:27",
    "location": {
      "lat": 16.761841,
      "lng": 98.867206
    },
    "course": 245,
    "speed": 26,
    "rpm": 1654,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:29",
    "location": {
      "lat": 16.761775,
      "lng": 98.867083
    },
    "course": 236.9,
    "speed": 27,
    "rpm": 1798,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:30",
    "location": {
      "lat": 16.761731,
      "lng": 98.867023
    },
    "course": 231.4,
    "speed": 29,
    "rpm": 1869,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:32",
    "location": {
      "lat": 16.761631,
      "lng": 98.866915
    },
    "course": 222.2,
    "speed": 28,
    "rpm": 1771,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:34:34",
    "location": {
      "lat": 16.761521,
      "lng": 98.866831
    },
    "course": 213.1,
    "speed": 26,
    "rpm": 1757,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:34:36",
    "location": {
      "lat": 16.761395,
      "lng": 98.86676
    },
    "course": 205.4,
    "speed": 30,
    "rpm": 1916,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:34:51",
    "location": {
      "lat": 16.76036,
      "lng": 98.866283
    },
    "course": 211.9,
    "speed": 30,
    "rpm": 1801,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:07",
    "location": {
      "lat": 16.759526,
      "lng": 98.865378
    },
    "course": 239.5,
    "speed": 29,
    "rpm": 2000,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:16",
    "location": {
      "lat": 16.75918,
      "lng": 98.864723
    },
    "course": 241.2,
    "speed": 34,
    "rpm": 2098,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:18",
    "location": {
      "lat": 16.759091,
      "lng": 98.864576
    },
    "course": 235,
    "speed": 32,
    "rpm": 2032,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:20",
    "location": {
      "lat": 16.758991,
      "lng": 98.864445
    },
    "course": 227.9,
    "speed": 32,
    "rpm": 1997,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:21",
    "location": {
      "lat": 16.758933,
      "lng": 98.864388
    },
    "course": 221.1,
    "speed": 31,
    "rpm": 2029,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:22",
    "location": {
      "lat": 16.75887,
      "lng": 98.864338
    },
    "course": 216,
    "speed": 33,
    "rpm": 2151,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:23",
    "location": {
      "lat": 16.758798,
      "lng": 98.864291
    },
    "course": 210,
    "speed": 34,
    "rpm": 2157,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:24",
    "location": {
      "lat": 16.758721,
      "lng": 98.864253
    },
    "course": 204.8,
    "speed": 33,
    "rpm": 2128,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:35:25",
    "location": {
      "lat": 16.758643,
      "lng": 98.864223
    },
    "course": 198.7,
    "speed": 33,
    "rpm": 2125,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:27",
    "location": {
      "lat": 16.758481,
      "lng": 98.864186
    },
    "course": 187.7,
    "speed": 32,
    "rpm": 2045,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:29",
    "location": {
      "lat": 16.75832,
      "lng": 98.864176
    },
    "course": 182.2,
    "speed": 32,
    "rpm": 2057,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:32",
    "location": {
      "lat": 16.758058,
      "lng": 98.864173
    },
    "course": 179.4,
    "speed": 37,
    "rpm": 1830,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:35:37",
    "location": {
      "lat": 16.75752,
      "lng": 98.864148
    },
    "course": 187.7,
    "speed": 45,
    "rpm": 2112,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:35:37",
    "location": {
      "lat": 16.75752,
      "lng": 98.864148
    },
    "course": 187.7,
    "speed": 45,
    "rpm": 2085,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:35:39",
    "location": {
      "lat": 16.757298,
      "lng": 98.864101
    },
    "course": 194.9,
    "speed": 44,
    "rpm": 2041,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:35:43",
    "location": {
      "lat": 16.756851,
      "lng": 98.863976
    },
    "course": 189.6,
    "speed": 46,
    "rpm": 2144,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:45",
    "location": {
      "lat": 16.75662,
      "lng": 98.863956
    },
    "course": 181.1,
    "speed": 46,
    "rpm": 2173,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:52",
    "location": {
      "lat": 16.755821,
      "lng": 98.863986
    },
    "course": 179.5,
    "speed": 42,
    "rpm": 1945,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:55",
    "location": {
      "lat": 16.755501,
      "lng": 98.863966
    },
    "course": 187.5,
    "speed": 42,
    "rpm": 1923,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:35:57",
    "location": {
      "lat": 16.755296,
      "lng": 98.863923
    },
    "course": 193.5,
    "speed": 42,
    "rpm": 1966,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:35:59",
    "location": {
      "lat": 16.755095,
      "lng": 98.863855
    },
    "course": 201.6,
    "speed": 42,
    "rpm": 1942,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:05",
    "location": {
      "lat": 16.754523,
      "lng": 98.863615
    },
    "course": 195.4,
    "speed": 39,
    "rpm": 1815,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:06",
    "location": {
      "lat": 16.754426,
      "lng": 98.863596
    },
    "course": 189.1,
    "speed": 39,
    "rpm": 1754,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:07",
    "location": {
      "lat": 16.754333,
      "lng": 98.86359
    },
    "course": 181.3,
    "speed": 36,
    "rpm": 1676,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:08",
    "location": {
      "lat": 16.754245,
      "lng": 98.863593
    },
    "course": 175.3,
    "speed": 35,
    "rpm": 1589,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:09",
    "location": {
      "lat": 16.754161,
      "lng": 98.863606
    },
    "course": 168.9,
    "speed": 32,
    "rpm": 1479,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:36:24",
    "location": {
      "lat": 16.753473,
      "lng": 98.863785
    },
    "course": 170.5,
    "speed": 20,
    "rpm": 1780,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:36:39",
    "location": {
      "lat": 16.752801,
      "lng": 98.86385
    },
    "course": 185.9,
    "speed": 19,
    "rpm": 1799,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:36:55",
    "location": {
      "lat": 16.751775,
      "lng": 98.863631
    },
    "course": 199.1,
    "speed": 23,
    "rpm": 1997,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:01",
    "location": {
      "lat": 16.751455,
      "lng": 98.863506
    },
    "course": 202.3,
    "speed": 22,
    "rpm": 2045,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:04",
    "location": {
      "lat": 16.751298,
      "lng": 98.863425
    },
    "course": 209.9,
    "speed": 23,
    "rpm": 1999,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:05",
    "location": {
      "lat": 16.75125,
      "lng": 98.863395
    },
    "course": 211.6,
    "speed": 22,
    "rpm": 1968,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:37:09",
    "location": {
      "lat": 16.751066,
      "lng": 98.863248
    },
    "course": 221.9,
    "speed": 24,
    "rpm": 2134,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:37:10",
    "location": {
      "lat": 16.751023,
      "lng": 98.863205
    },
    "course": 224.1,
    "speed": 23,
    "rpm": 2103,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:37:15",
    "location": {
      "lat": 16.750813,
      "lng": 98.862966
    },
    "course": 225.5,
    "speed": 25,
    "rpm": 2234,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:37:17",
    "location": {
      "lat": 16.750716,
      "lng": 98.862876
    },
    "course": 218.5,
    "speed": 25,
    "rpm": 2220,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:19",
    "location": {
      "lat": 16.750616,
      "lng": 98.862808
    },
    "course": 208.3,
    "speed": 21,
    "rpm": 1985,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:21",
    "location": {
      "lat": 16.75051,
      "lng": 98.86276
    },
    "course": 200.1,
    "speed": 23,
    "rpm": 2131,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:23",
    "location": {
      "lat": 16.750391,
      "lng": 98.862726
    },
    "course": 191.3,
    "speed": 24,
    "rpm": 2133,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:37:25",
    "location": {
      "lat": 16.75027,
      "lng": 98.862711
    },
    "course": 183.5,
    "speed": 24,
    "rpm": 2102,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:37:27",
    "location": {
      "lat": 16.75015,
      "lng": 98.862715
    },
    "course": 176,
    "speed": 24,
    "rpm": 2075,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:37:42",
    "location": {
      "lat": 16.74921,
      "lng": 98.862816
    },
    "course": 182.4,
    "speed": 24,
    "rpm": 2102,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:37:58",
    "location": {
      "lat": 16.748198,
      "lng": 98.862685
    },
    "course": 184,
    "speed": 24,
    "rpm": 2150,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:37:59",
    "location": {
      "lat": 16.748138,
      "lng": 98.862683
    },
    "course": 180.7,
    "speed": 24,
    "rpm": 2100,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:02",
    "location": {
      "lat": 16.747951,
      "lng": 98.862695
    },
    "course": 173.3,
    "speed": 25,
    "rpm": 2145,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:05",
    "location": {
      "lat": 16.747771,
      "lng": 98.862731
    },
    "course": 165.6,
    "speed": 24,
    "rpm": 2126,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:07",
    "location": {
      "lat": 16.747651,
      "lng": 98.862771
    },
    "course": 160.1,
    "speed": 25,
    "rpm": 2181,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:09",
    "location": {
      "lat": 16.747538,
      "lng": 98.862821
    },
    "course": 154.8,
    "speed": 24,
    "rpm": 2094,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:24",
    "location": {
      "lat": 16.746766,
      "lng": 98.863373
    },
    "course": 145.2,
    "speed": 25,
    "rpm": 2227,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:27",
    "location": {
      "lat": 16.746605,
      "lng": 98.86348
    },
    "course": 151.4,
    "speed": 25,
    "rpm": 2232,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:29",
    "location": {
      "lat": 16.74649,
      "lng": 98.863535
    },
    "course": 157.3,
    "speed": 24,
    "rpm": 2135,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:31",
    "location": {
      "lat": 16.746371,
      "lng": 98.863578
    },
    "course": 163.4,
    "speed": 25,
    "rpm": 2237,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:33",
    "location": {
      "lat": 16.746245,
      "lng": 98.863605
    },
    "course": 173.4,
    "speed": 25,
    "rpm": 2155,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:35",
    "location": {
      "lat": 16.746121,
      "lng": 98.863608
    },
    "course": 182.3,
    "speed": 24,
    "rpm": 2122,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:37",
    "location": {
      "lat": 16.745995,
      "lng": 98.863596
    },
    "course": 187.3,
    "speed": 26,
    "rpm": 2307,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:39",
    "location": {
      "lat": 16.745863,
      "lng": 98.863571
    },
    "course": 193.1,
    "speed": 26,
    "rpm": 2246,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:41",
    "location": {
      "lat": 16.74574,
      "lng": 98.86353
    },
    "course": 200.8,
    "speed": 25,
    "rpm": 2213,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:43",
    "location": {
      "lat": 16.745621,
      "lng": 98.863471
    },
    "course": 208.2,
    "speed": 26,
    "rpm": 2246,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:45",
    "location": {
      "lat": 16.745513,
      "lng": 98.8634
    },
    "course": 215.4,
    "speed": 25,
    "rpm": 2123,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:47",
    "location": {
      "lat": 16.745418,
      "lng": 98.863316
    },
    "course": 222.6,
    "speed": 24,
    "rpm": 2208,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:49",
    "location": {
      "lat": 16.74533,
      "lng": 98.86322
    },
    "course": 228.5,
    "speed": 25,
    "rpm": 2234,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:51",
    "location": {
      "lat": 16.745255,
      "lng": 98.863116
    },
    "course": 235.8,
    "speed": 24,
    "rpm": 1850,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:53",
    "location": {
      "lat": 16.745188,
      "lng": 98.862996
    },
    "course": 241.6,
    "speed": 28,
    "rpm": 1892,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:53",
    "location": {
      "lat": 16.745188,
      "lng": 98.862996
    },
    "course": 241.6,
    "speed": 28,
    "rpm": 1801,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:38:57",
    "location": {
      "lat": 16.745038,
      "lng": 98.862696
    },
    "course": 242.4,
    "speed": 34,
    "rpm": 2221,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:08",
    "location": {
      "lat": 16.74462,
      "lng": 98.861776
    },
    "course": 250.9,
    "speed": 35,
    "rpm": 2177,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:39:23",
    "location": {
      "lat": 16.74435,
      "lng": 98.86042
    },
    "course": 252.4,
    "speed": 35,
    "rpm": 2265,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:25",
    "location": {
      "lat": 16.744281,
      "lng": 98.86025
    },
    "course": 243.3,
    "speed": 35,
    "rpm": 2194,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:27",
    "location": {
      "lat": 16.744186,
      "lng": 98.860098
    },
    "course": 232.5,
    "speed": 34,
    "rpm": 2162,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:28",
    "location": {
      "lat": 16.74413,
      "lng": 98.860031
    },
    "course": 226.7,
    "speed": 34,
    "rpm": 2131,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:29",
    "location": {
      "lat": 16.744066,
      "lng": 98.859973
    },
    "course": 220.6,
    "speed": 34,
    "rpm": 2200,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:30",
    "location": {
      "lat": 16.743996,
      "lng": 98.859918
    },
    "course": 215.1,
    "speed": 35,
    "rpm": 2273,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:32",
    "location": {
      "lat": 16.74384,
      "lng": 98.85982
    },
    "course": 209.2,
    "speed": 36,
    "rpm": 2256,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:44",
    "location": {
      "lat": 16.74285,
      "lng": 98.859318
    },
    "course": 206.1,
    "speed": 42,
    "rpm": 1402,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:47",
    "location": {
      "lat": 16.742535,
      "lng": 98.85915
    },
    "course": 208.6,
    "speed": 50,
    "rpm": 1755,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:49",
    "location": {
      "lat": 16.74231,
      "lng": 98.859
    },
    "course": 216.2,
    "speed": 54,
    "rpm": 1858,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:50",
    "location": {
      "lat": 16.742203,
      "lng": 98.858905
    },
    "course": 222.3,
    "speed": 57,
    "rpm": 1920,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:51",
    "location": {
      "lat": 16.742103,
      "lng": 98.858796
    },
    "course": 228.4,
    "speed": 58,
    "rpm": 1949,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:39:52",
    "location": {
      "lat": 16.742011,
      "lng": 98.858676
    },
    "course": 233.5,
    "speed": 59,
    "rpm": 1986,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:39:53",
    "location": {
      "lat": 16.741931,
      "lng": 98.858545
    },
    "course": 238.8,
    "speed": 60,
    "rpm": 2005,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:39:55",
    "location": {
      "lat": 16.741786,
      "lng": 98.858261
    },
    "course": 243,
    "speed": 62,
    "rpm": 2115,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:01",
    "location": {
      "lat": 16.741341,
      "lng": 98.857381
    },
    "course": 241.5,
    "speed": 66,
    "rpm": 1671,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:07",
    "location": {
      "lat": 16.740858,
      "lng": 98.856395
    },
    "course": 247.5,
    "speed": 71,
    "rpm": 1702,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:09",
    "location": {
      "lat": 16.74075,
      "lng": 98.856038
    },
    "course": 256,
    "speed": 72,
    "rpm": 1738,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:11",
    "location": {
      "lat": 16.7407,
      "lng": 98.855661
    },
    "course": 265.7,
    "speed": 73,
    "rpm": 1774,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:16",
    "location": {
      "lat": 16.740736,
      "lng": 98.854671
    },
    "course": 274.4,
    "speed": 78,
    "rpm": 1901,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:28",
    "location": {
      "lat": 16.740896,
      "lng": 98.852171
    },
    "course": 273.8,
    "speed": 79,
    "rpm": 1875,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:32",
    "location": {
      "lat": 16.740991,
      "lng": 98.851375
    },
    "course": 283.3,
    "speed": 75,
    "rpm": 1805,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:33",
    "location": {
      "lat": 16.741046,
      "lng": 98.851188
    },
    "course": 289,
    "speed": 74,
    "rpm": 1800,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:34",
    "location": {
      "lat": 16.741118,
      "lng": 98.85101
    },
    "course": 294.5,
    "speed": 74,
    "rpm": 1764,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:35",
    "location": {
      "lat": 16.741206,
      "lng": 98.850841
    },
    "course": 300.2,
    "speed": 73,
    "rpm": 1751,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:37",
    "location": {
      "lat": 16.741415,
      "lng": 98.850533
    },
    "course": 307,
    "speed": 71,
    "rpm": 1710,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:37",
    "location": {
      "lat": 16.741415,
      "lng": 98.850533
    },
    "course": 307,
    "speed": 71,
    "rpm": 1701,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:39",
    "location": {
      "lat": 16.741608,
      "lng": 98.85023
    },
    "course": 299.6,
    "speed": 69,
    "rpm": 1674,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:40",
    "location": {
      "lat": 16.741681,
      "lng": 98.850066
    },
    "course": 293.1,
    "speed": 68,
    "rpm": 1631,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:41",
    "location": {
      "lat": 16.741735,
      "lng": 98.849901
    },
    "course": 286.5,
    "speed": 66,
    "rpm": 1588,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:42",
    "location": {
      "lat": 16.74177,
      "lng": 98.849736
    },
    "course": 280.3,
    "speed": 64,
    "rpm": 1542,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:44",
    "location": {
      "lat": 16.741806,
      "lng": 98.849416
    },
    "course": 275.1,
    "speed": 60,
    "rpm": 1800,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:40:47",
    "location": {
      "lat": 16.741826,
      "lng": 98.848978
    },
    "course": 268.5,
    "speed": 53,
    "rpm": 1757,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:48",
    "location": {
      "lat": 16.741815,
      "lng": 98.848843
    },
    "course": 263.4,
    "speed": 51,
    "rpm": 1727,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:50",
    "location": {
      "lat": 16.741763,
      "lng": 98.848586
    },
    "course": 255,
    "speed": 48,
    "rpm": 1610,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:52",
    "location": {
      "lat": 16.741713,
      "lng": 98.848353
    },
    "course": 260.8,
    "speed": 44,
    "rpm": 1466,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:53",
    "location": {
      "lat": 16.741703,
      "lng": 98.84824
    },
    "course": 267,
    "speed": 43,
    "rpm": 1429,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:54",
    "location": {
      "lat": 16.741706,
      "lng": 98.848128
    },
    "course": 272.8,
    "speed": 42,
    "rpm": 1406,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:55",
    "location": {
      "lat": 16.741718,
      "lng": 98.848018
    },
    "course": 278.1,
    "speed": 41,
    "rpm": 1389,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:40:56",
    "location": {
      "lat": 16.741738,
      "lng": 98.847911
    },
    "course": 283.6,
    "speed": 41,
    "rpm": 1376,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:00",
    "location": {
      "lat": 16.741853,
      "lng": 98.847495
    },
    "course": 279.2,
    "speed": 42,
    "rpm": 1453,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:01",
    "location": {
      "lat": 16.741861,
      "lng": 98.847383
    },
    "course": 272.5,
    "speed": 43,
    "rpm": 1463,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:02",
    "location": {
      "lat": 16.741858,
      "lng": 98.84727
    },
    "course": 266,
    "speed": 43,
    "rpm": 1486,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:03",
    "location": {
      "lat": 16.741841,
      "lng": 98.847155
    },
    "course": 259.6,
    "speed": 44,
    "rpm": 1505,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:04",
    "location": {
      "lat": 16.741813,
      "lng": 98.847041
    },
    "course": 253,
    "speed": 45,
    "rpm": 1535,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:05",
    "location": {
      "lat": 16.74177,
      "lng": 98.846931
    },
    "course": 246.3,
    "speed": 46,
    "rpm": 1562,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:07",
    "location": {
      "lat": 16.74166,
      "lng": 98.846715
    },
    "course": 239.5,
    "speed": 47,
    "rpm": 1597,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:10",
    "location": {
      "lat": 16.741488,
      "lng": 98.846378
    },
    "course": 245.3,
    "speed": 49,
    "rpm": 1576,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:11",
    "location": {
      "lat": 16.741443,
      "lng": 98.846256
    },
    "course": 250.6,
    "speed": 50,
    "rpm": 1283,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:12",
    "location": {
      "lat": 16.74141,
      "lng": 98.846128
    },
    "course": 256.1,
    "speed": 51,
    "rpm": 1217,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:13",
    "location": {
      "lat": 16.741388,
      "lng": 98.845993
    },
    "course": 262.5,
    "speed": 52,
    "rpm": 1282,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:14",
    "location": {
      "lat": 16.741381,
      "lng": 98.845853
    },
    "course": 268.7,
    "speed": 54,
    "rpm": 1314,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:15",
    "location": {
      "lat": 16.741388,
      "lng": 98.845708
    },
    "course": 274.8,
    "speed": 56,
    "rpm": 1363,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:17",
    "location": {
      "lat": 16.74144,
      "lng": 98.845411
    },
    "course": 283.6,
    "speed": 59,
    "rpm": 1450,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:41:20",
    "location": {
      "lat": 16.741543,
      "lng": 98.844948
    },
    "course": 279.1,
    "speed": 60,
    "rpm": 1471,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:21",
    "location": {
      "lat": 16.741555,
      "lng": 98.84479
    },
    "course": 272.1,
    "speed": 61,
    "rpm": 1480,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:22",
    "location": {
      "lat": 16.741545,
      "lng": 98.84463
    },
    "course": 264.1,
    "speed": 62,
    "rpm": 1505,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:23",
    "location": {
      "lat": 16.741516,
      "lng": 98.844468
    },
    "course": 257.4,
    "speed": 63,
    "rpm": 1537,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:41:26",
    "location": {
      "lat": 16.741403,
      "lng": 98.84397
    },
    "course": 260.2,
    "speed": 67,
    "rpm": 1635,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:41:27",
    "location": {
      "lat": 16.741385,
      "lng": 98.843791
    },
    "course": 265.5,
    "speed": 69,
    "rpm": 1676,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:41:28",
    "location": {
      "lat": 16.741385,
      "lng": 98.843608
    },
    "course": 271.5,
    "speed": 70,
    "rpm": 1714,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:41:29",
    "location": {
      "lat": 16.741403,
      "lng": 98.843423
    },
    "course": 277.5,
    "speed": 72,
    "rpm": 1751,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:41:31",
    "location": {
      "lat": 16.741485,
      "lng": 98.843045
    },
    "course": 285.3,
    "speed": 75,
    "rpm": 1185,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:41:34",
    "location": {
      "lat": 16.741648,
      "lng": 98.842456
    },
    "course": 286.2,
    "speed": 79,
    "rpm": 1402,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:40",
    "location": {
      "lat": 16.742031,
      "lng": 98.841263
    },
    "course": 294.8,
    "speed": 79,
    "rpm": 1368,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:42",
    "location": {
      "lat": 16.742228,
      "lng": 98.840913
    },
    "course": 303.6,
    "speed": 77,
    "rpm": 1340,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:51",
    "location": {
      "lat": 16.74323,
      "lng": 98.83947
    },
    "course": 299.1,
    "speed": 74,
    "rpm": 1294,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:53",
    "location": {
      "lat": 16.743378,
      "lng": 98.839116
    },
    "course": 289.9,
    "speed": 74,
    "rpm": 1293,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:54",
    "location": {
      "lat": 16.743431,
      "lng": 98.838931
    },
    "course": 284.9,
    "speed": 74,
    "rpm": 1292,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:54",
    "location": {
      "lat": 16.743431,
      "lng": 98.838931
    },
    "course": 284.9,
    "speed": 74,
    "rpm": 1288,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:56",
    "location": {
      "lat": 16.743495,
      "lng": 98.83855
    },
    "course": 276.9,
    "speed": 74,
    "rpm": 1307,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:59",
    "location": {
      "lat": 16.743553,
      "lng": 98.837965
    },
    "course": 275.9,
    "speed": 75,
    "rpm": 1316,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:11",
    "location": {
      "lat": 16.743755,
      "lng": 98.835588
    },
    "course": 269.7,
    "speed": 77,
    "rpm": 1346,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:13",
    "location": {
      "lat": 16.743718,
      "lng": 98.835185
    },
    "course": 260.7,
    "speed": 77,
    "rpm": 1355,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:15",
    "location": {
      "lat": 16.74362,
      "lng": 98.834791
    },
    "course": 251.5,
    "speed": 78,
    "rpm": 1357,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:17",
    "location": {
      "lat": 16.743465,
      "lng": 98.834416
    },
    "course": 244.5,
    "speed": 78,
    "rpm": 1360,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:42:32",
    "location": {
      "lat": 16.742086,
      "lng": 98.831645
    },
    "course": 242.6,
    "speed": 81,
    "rpm": 1414,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:42:47",
    "location": {
      "lat": 16.740901,
      "lng": 98.82868
    },
    "course": 255.5,
    "speed": 81,
    "rpm": 1392,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:42:55",
    "location": {
      "lat": 16.740485,
      "lng": 98.82716
    },
    "course": 251.7,
    "speed": 68,
    "rpm": 1157,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:03",
    "location": {
      "lat": 16.739955,
      "lng": 98.826056
    },
    "course": 236.9,
    "speed": 49,
    "rpm": 610,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:08",
    "location": {
      "lat": 16.739673,
      "lng": 98.825546
    },
    "course": 244.7,
    "speed": 44,
    "rpm": 1460,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:10",
    "location": {
      "lat": 16.739593,
      "lng": 98.825328
    },
    "course": 251.7,
    "speed": 44,
    "rpm": 1488,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:12",
    "location": {
      "lat": 16.739536,
      "lng": 98.8251
    },
    "course": 257,
    "speed": 45,
    "rpm": 1526,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:14",
    "location": {
      "lat": 16.7395,
      "lng": 98.824858
    },
    "course": 263.7,
    "speed": 47,
    "rpm": 1583,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:15",
    "location": {
      "lat": 16.739493,
      "lng": 98.824731
    },
    "course": 268.7,
    "speed": 48,
    "rpm": 1621,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:17",
    "location": {
      "lat": 16.739505,
      "lng": 98.82448
    },
    "course": 274.9,
    "speed": 47,
    "rpm": 1582,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:19",
    "location": {
      "lat": 16.739541,
      "lng": 98.824238
    },
    "course": 282.2,
    "speed": 47,
    "rpm": 1581,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:21",
    "location": {
      "lat": 16.739615,
      "lng": 98.823993
    },
    "course": 290.8,
    "speed": 51,
    "rpm": 1774,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:43:23",
    "location": {
      "lat": 16.739726,
      "lng": 98.82374
    },
    "course": 297.5,
    "speed": 54,
    "rpm": 1815,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:43:25",
    "location": {
      "lat": 16.739868,
      "lng": 98.823495
    },
    "course": 303.1,
    "speed": 55,
    "rpm": 1839,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:43:34",
    "location": {
      "lat": 16.740698,
      "lng": 98.822415
    },
    "course": 312.9,
    "speed": 62,
    "rpm": 2108,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:43:41",
    "location": {
      "lat": 16.741411,
      "lng": 98.821578
    },
    "course": 305.2,
    "speed": 60,
    "rpm": 2001,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:43:43",
    "location": {
      "lat": 16.741556,
      "lng": 98.821311
    },
    "course": 295.2,
    "speed": 57,
    "rpm": 1920,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:43:43",
    "location": {
      "lat": 16.741556,
      "lng": 98.821311
    },
    "course": 295.2,
    "speed": 57,
    "rpm": 1918,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:43:44",
    "location": {
      "lat": 16.74161,
      "lng": 98.821171
    },
    "course": 290,
    "speed": 57,
    "rpm": 1932,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:45",
    "location": {
      "lat": 16.74165,
      "lng": 98.821026
    },
    "course": 284.7,
    "speed": 58,
    "rpm": 1973,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:46",
    "location": {
      "lat": 16.741676,
      "lng": 98.820875
    },
    "course": 279.6,
    "speed": 59,
    "rpm": 1999,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:47",
    "location": {
      "lat": 16.741691,
      "lng": 98.820718
    },
    "course": 274.2,
    "speed": 61,
    "rpm": 2069,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:48",
    "location": {
      "lat": 16.741696,
      "lng": 98.820556
    },
    "course": 270.3,
    "speed": 62,
    "rpm": 2087,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:49",
    "location": {
      "lat": 16.741691,
      "lng": 98.820391
    },
    "course": 267.7,
    "speed": 62,
    "rpm": 2076,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:43:55",
    "location": {
      "lat": 16.741636,
      "lng": 98.81942
    },
    "course": 266.4,
    "speed": 64,
    "rpm": 1620,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:44:04",
    "location": {
      "lat": 16.74156,
      "lng": 98.81784
    },
    "course": 267.7,
    "speed": 64,
    "rpm": 1511,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:08",
    "location": {
      "lat": 16.741571,
      "lng": 98.817183
    },
    "course": 275.6,
    "speed": 61,
    "rpm": 1468,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:10",
    "location": {
      "lat": 16.741621,
      "lng": 98.816875
    },
    "course": 282.7,
    "speed": 59,
    "rpm": 1430,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:12",
    "location": {
      "lat": 16.741708,
      "lng": 98.816578
    },
    "course": 289.7,
    "speed": 59,
    "rpm": 1434,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:14",
    "location": {
      "lat": 16.741828,
      "lng": 98.816291
    },
    "course": 296,
    "speed": 59,
    "rpm": 1430,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:30",
    "location": {
      "lat": 16.742935,
      "lng": 98.81418
    },
    "course": 298.4,
    "speed": 50,
    "rpm": 1215,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:44:45",
    "location": {
      "lat": 16.743696,
      "lng": 98.812766
    },
    "course": 299,
    "speed": 28,
    "rpm": 594,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:45:01",
    "location": {
      "lat": 16.743938,
      "lng": 98.81231
    },
    "course": 298.4,
    "speed": 0,
    "rpm": 497,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:22:41",
    "location": {
      "lat": 16.76095,
      "lng": 98.923875
    },
    "course": 197.5,
    "speed": 79,
    "rpm": 1939,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:22:48",
    "location": {
      "lat": 16.75965,
      "lng": 98.923345
    },
    "course": 203.1,
    "speed": 74,
    "rpm": 1775,
    "fuel": 91,
    "coolant": 81
  },
  {
    "gpsdate": "2020-05-02 02:40:16",
    "location": {
      "lat": 16.740736,
      "lng": 98.854671
    },
    "course": 274.4,
    "speed": 78,
    "rpm": 1901,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:40:28",
    "location": {
      "lat": 16.740896,
      "lng": 98.852171
    },
    "course": 273.8,
    "speed": 79,
    "rpm": 1875,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:40:32",
    "location": {
      "lat": 16.740991,
      "lng": 98.851375
    },
    "course": 283.3,
    "speed": 75,
    "rpm": 1805,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:31",
    "location": {
      "lat": 16.741485,
      "lng": 98.843045
    },
    "course": 285.3,
    "speed": 75,
    "rpm": 1185,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:41:34",
    "location": {
      "lat": 16.741648,
      "lng": 98.842456
    },
    "course": 286.2,
    "speed": 79,
    "rpm": 1402,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:40",
    "location": {
      "lat": 16.742031,
      "lng": 98.841263
    },
    "course": 294.8,
    "speed": 79,
    "rpm": 1368,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:42",
    "location": {
      "lat": 16.742228,
      "lng": 98.840913
    },
    "course": 303.6,
    "speed": 77,
    "rpm": 1340,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:41:51",
    "location": {
      "lat": 16.74323,
      "lng": 98.83947
    },
    "course": 299.1,
    "speed": 74,
    "rpm": 1294,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:42:11",
    "location": {
      "lat": 16.743755,
      "lng": 98.835588
    },
    "course": 269.7,
    "speed": 77,
    "rpm": 1346,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:13",
    "location": {
      "lat": 16.743718,
      "lng": 98.835185
    },
    "course": 260.7,
    "speed": 77,
    "rpm": 1355,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:15",
    "location": {
      "lat": 16.74362,
      "lng": 98.834791
    },
    "course": 251.5,
    "speed": 78,
    "rpm": 1357,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:42:17",
    "location": {
      "lat": 16.743465,
      "lng": 98.834416
    },
    "course": 244.5,
    "speed": 78,
    "rpm": 1360,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:42:32",
    "location": {
      "lat": 16.742086,
      "lng": 98.831645
    },
    "course": 242.6,
    "speed": 81,
    "rpm": 1414,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:42:47",
    "location": {
      "lat": 16.740901,
      "lng": 98.82868
    },
    "course": 255.5,
    "speed": 81,
    "rpm": 1392,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:42:55",
    "location": {
      "lat": 16.740485,
      "lng": 98.82716
    },
    "course": 251.7,
    "speed": 68,
    "rpm": 1157,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:45:16",
    "location": {
      "lat": 16.743951,
      "lng": 98.812285
    },
    "course": 300.1,
    "speed": 5,
    "rpm": 999,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:45:32",
    "location": {
      "lat": 16.744063,
      "lng": 98.812001
    },
    "course": 288.3,
    "speed": 10,
    "rpm": 1344,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:45:42",
    "location": {
      "lat": 16.744111,
      "lng": 98.81169
    },
    "course": 279.3,
    "speed": 15,
    "rpm": 1926,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:45:57",
    "location": {
      "lat": 16.744203,
      "lng": 98.81079
    },
    "course": 276.7,
    "speed": 32,
    "rpm": 1932,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:46:07",
    "location": {
      "lat": 16.744266,
      "lng": 98.809851
    },
    "course": 266.3,
    "speed": 41,
    "rpm": 1944,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:46:09",
    "location": {
      "lat": 16.744241,
      "lng": 98.809631
    },
    "course": 261,
    "speed": 43,
    "rpm": 2033,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:46:11",
    "location": {
      "lat": 16.744195,
      "lng": 98.809406
    },
    "course": 256.2,
    "speed": 44,
    "rpm": 2114,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:46:13",
    "location": {
      "lat": 16.74413,
      "lng": 98.809178
    },
    "course": 251.1,
    "speed": 45,
    "rpm": 2106,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:46:15",
    "location": {
      "lat": 16.744043,
      "lng": 98.808961
    },
    "course": 245.5,
    "speed": 44,
    "rpm": 1461,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:46:15",
    "location": {
      "lat": 16.744043,
      "lng": 98.808961
    },
    "course": 245.5,
    "speed": 44,
    "rpm": 1479,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:46:27",
    "location": {
      "lat": 16.743476,
      "lng": 98.80776
    },
    "course": 252.6,
    "speed": 44,
    "rpm": 1477,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:29",
    "location": {
      "lat": 16.743423,
      "lng": 98.807531
    },
    "course": 258.3,
    "speed": 45,
    "rpm": 1550,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:31",
    "location": {
      "lat": 16.743388,
      "lng": 98.807286
    },
    "course": 264,
    "speed": 48,
    "rpm": 1655,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:33",
    "location": {
      "lat": 16.743378,
      "lng": 98.807018
    },
    "course": 269.6,
    "speed": 53,
    "rpm": 1840,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:44",
    "location": {
      "lat": 16.743336,
      "lng": 98.805241
    },
    "course": 274.9,
    "speed": 64,
    "rpm": 1532,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:46",
    "location": {
      "lat": 16.743388,
      "lng": 98.804916
    },
    "course": 282.6,
    "speed": 62,
    "rpm": 1493,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:48",
    "location": {
      "lat": 16.743481,
      "lng": 98.804611
    },
    "course": 290.6,
    "speed": 60,
    "rpm": 1453,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:50",
    "location": {
      "lat": 16.743608,
      "lng": 98.804326
    },
    "course": 297.6,
    "speed": 60,
    "rpm": 1439,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:52",
    "location": {
      "lat": 16.743768,
      "lng": 98.804061
    },
    "course": 304.9,
    "speed": 60,
    "rpm": 1445,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:46:54",
    "location": {
      "lat": 16.743961,
      "lng": 98.803816
    },
    "course": 312.6,
    "speed": 61,
    "rpm": 1479,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:46:56",
    "location": {
      "lat": 16.744193,
      "lng": 98.803595
    },
    "course": 320.3,
    "speed": 63,
    "rpm": 1529,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:46:58",
    "location": {
      "lat": 16.744463,
      "lng": 98.803406
    },
    "course": 328.9,
    "speed": 66,
    "rpm": 1597,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:00",
    "location": {
      "lat": 16.744765,
      "lng": 98.803245
    },
    "course": 334.6,
    "speed": 68,
    "rpm": 1650,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:08",
    "location": {
      "lat": 16.746063,
      "lng": 98.802666
    },
    "course": 341.7,
    "speed": 70,
    "rpm": 1682,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:47:09",
    "location": {
      "lat": 16.746233,
      "lng": 98.802621
    },
    "course": 347.3,
    "speed": 69,
    "rpm": 1679,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:10",
    "location": {
      "lat": 16.746406,
      "lng": 98.802595
    },
    "course": 352.9,
    "speed": 69,
    "rpm": 1671,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:11",
    "location": {
      "lat": 16.746581,
      "lng": 98.802585
    },
    "course": 358.2,
    "speed": 69,
    "rpm": 1664,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:12",
    "location": {
      "lat": 16.746755,
      "lng": 98.80259
    },
    "course": 3.2,
    "speed": 69,
    "rpm": 1656,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:13",
    "location": {
      "lat": 16.746926,
      "lng": 98.802615
    },
    "course": 9.2,
    "speed": 68,
    "rpm": 1652,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:14",
    "location": {
      "lat": 16.747093,
      "lng": 98.802656
    },
    "course": 15.3,
    "speed": 68,
    "rpm": 1639,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:15",
    "location": {
      "lat": 16.747253,
      "lng": 98.802716
    },
    "course": 21.7,
    "speed": 67,
    "rpm": 1619,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:16",
    "location": {
      "lat": 16.747405,
      "lng": 98.802793
    },
    "course": 27.5,
    "speed": 66,
    "rpm": 1592,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:18",
    "location": {
      "lat": 16.747681,
      "lng": 98.802981
    },
    "course": 37.2,
    "speed": 64,
    "rpm": 1542,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:19",
    "location": {
      "lat": 16.747801,
      "lng": 98.803091
    },
    "course": 43.2,
    "speed": 63,
    "rpm": 1509,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:26",
    "location": {
      "lat": 16.748488,
      "lng": 98.803865
    },
    "course": 43.4,
    "speed": 51,
    "rpm": 1226,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:28",
    "location": {
      "lat": 16.74868,
      "lng": 98.804021
    },
    "course": 34.4,
    "speed": 46,
    "rpm": 1749,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:30",
    "location": {
      "lat": 16.74887,
      "lng": 98.804135
    },
    "course": 26.9,
    "speed": 42,
    "rpm": 1406,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:32",
    "location": {
      "lat": 16.749058,
      "lng": 98.804215
    },
    "course": 18.6,
    "speed": 39,
    "rpm": 1724,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:34",
    "location": {
      "lat": 16.749231,
      "lng": 98.804263
    },
    "course": 12.1,
    "speed": 33,
    "rpm": 1542,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:36",
    "location": {
      "lat": 16.749391,
      "lng": 98.80429
    },
    "course": 6.8,
    "speed": 30,
    "rpm": 1418,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:39",
    "location": {
      "lat": 16.749608,
      "lng": 98.8043
    },
    "course": 359.2,
    "speed": 26,
    "rpm": 1739,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:43",
    "location": {
      "lat": 16.749841,
      "lng": 98.804278
    },
    "course": 350,
    "speed": 22,
    "rpm": 1417,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:47:58",
    "location": {
      "lat": 16.750608,
      "lng": 98.80411
    },
    "course": 357,
    "speed": 21,
    "rpm": 1433,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:08",
    "location": {
      "lat": 16.751243,
      "lng": 98.804123
    },
    "course": 356.9,
    "speed": 29,
    "rpm": 1883,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:24",
    "location": {
      "lat": 16.752521,
      "lng": 98.804153
    },
    "course": 2.4,
    "speed": 34,
    "rpm": 1602,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:39",
    "location": {
      "lat": 16.753918,
      "lng": 98.804208
    },
    "course": 0.8,
    "speed": 39,
    "rpm": 1690,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:43",
    "location": {
      "lat": 16.754318,
      "lng": 98.804183
    },
    "course": 352.1,
    "speed": 40,
    "rpm": 1365,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:45",
    "location": {
      "lat": 16.75452,
      "lng": 98.80414
    },
    "course": 345.1,
    "speed": 42,
    "rpm": 1434,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:47",
    "location": {
      "lat": 16.754726,
      "lng": 98.804065
    },
    "course": 336.9,
    "speed": 44,
    "rpm": 1523,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:49",
    "location": {
      "lat": 16.754931,
      "lng": 98.803951
    },
    "course": 328.9,
    "speed": 47,
    "rpm": 1641,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:51",
    "location": {
      "lat": 16.755131,
      "lng": 98.803795
    },
    "course": 319.5,
    "speed": 51,
    "rpm": 1744,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:53",
    "location": {
      "lat": 16.755315,
      "lng": 98.803595
    },
    "course": 309.7,
    "speed": 54,
    "rpm": 1322,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:54",
    "location": {
      "lat": 16.755395,
      "lng": 98.803478
    },
    "course": 303.9,
    "speed": 56,
    "rpm": 1365,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:55",
    "location": {
      "lat": 16.755466,
      "lng": 98.803348
    },
    "course": 297.6,
    "speed": 57,
    "rpm": 1425,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:56",
    "location": {
      "lat": 16.755525,
      "lng": 98.803205
    },
    "course": 291.3,
    "speed": 60,
    "rpm": 1475,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:57",
    "location": {
      "lat": 16.75557,
      "lng": 98.803051
    },
    "course": 285.9,
    "speed": 62,
    "rpm": 1532,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:58",
    "location": {
      "lat": 16.755603,
      "lng": 98.802888
    },
    "course": 280.2,
    "speed": 64,
    "rpm": 1588,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:48:59",
    "location": {
      "lat": 16.755618,
      "lng": 98.802718
    },
    "course": 273.7,
    "speed": 66,
    "rpm": 1596,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:49:00",
    "location": {
      "lat": 16.755618,
      "lng": 98.802546
    },
    "course": 268.4,
    "speed": 66,
    "rpm": 1599,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:49:04",
    "location": {
      "lat": 16.755603,
      "lng": 98.801823
    },
    "course": 275.4,
    "speed": 70,
    "rpm": 1686,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:49:05",
    "location": {
      "lat": 16.755633,
      "lng": 98.801641
    },
    "course": 281.4,
    "speed": 71,
    "rpm": 1714,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:49:06",
    "location": {
      "lat": 16.755681,
      "lng": 98.801461
    },
    "course": 287.3,
    "speed": 71,
    "rpm": 1740,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:49:08",
    "location": {
      "lat": 16.755831,
      "lng": 98.801106
    },
    "course": 298.2,
    "speed": 76,
    "rpm": 834,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:49:09",
    "location": {
      "lat": 16.755936,
      "lng": 98.800935
    },
    "course": 304.4,
    "speed": 78,
    "rpm": 1386,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:49:10",
    "location": {
      "lat": 16.756061,
      "lng": 98.80077
    },
    "course": 309.5,
    "speed": 81,
    "rpm": 1458,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:49:10",
    "location": {
      "lat": 16.756061,
      "lng": 98.80077
    },
    "course": 309.5,
    "speed": 81,
    "rpm": 1422,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:49:12",
    "location": {
      "lat": 16.756351,
      "lng": 98.800456
    },
    "course": 315.4,
    "speed": 84,
    "rpm": 1493,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:49:27",
    "location": {
      "lat": 16.758676,
      "lng": 98.798093
    },
    "course": 315.4,
    "speed": 84,
    "rpm": 1464,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:49:38",
    "location": {
      "lat": 16.760333,
      "lng": 98.796455
    },
    "course": 322.5,
    "speed": 81,
    "rpm": 1402,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:49:40",
    "location": {
      "lat": 16.760676,
      "lng": 98.796228
    },
    "course": 330.7,
    "speed": 80,
    "rpm": 1399,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:49:42",
    "location": {
      "lat": 16.761043,
      "lng": 98.796051
    },
    "course": 337.8,
    "speed": 80,
    "rpm": 1397,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:49:44",
    "location": {
      "lat": 16.761426,
      "lng": 98.795921
    },
    "course": 344.7,
    "speed": 79,
    "rpm": 1391,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:49:46",
    "location": {
      "lat": 16.761818,
      "lng": 98.795846
    },
    "course": 352.3,
    "speed": 79,
    "rpm": 1374,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:49:59",
    "location": {
      "lat": 16.76436,
      "lng": 98.795521
    },
    "course": 346,
    "speed": 75,
    "rpm": 1310,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:01",
    "location": {
      "lat": 16.764713,
      "lng": 98.795395
    },
    "course": 338.2,
    "speed": 73,
    "rpm": 1277,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:03",
    "location": {
      "lat": 16.765045,
      "lng": 98.795231
    },
    "course": 332,
    "speed": 72,
    "rpm": 1235,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:03",
    "location": {
      "lat": 16.765045,
      "lng": 98.795231
    },
    "course": 332,
    "speed": 72,
    "rpm": 1251,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:11",
    "location": {
      "lat": 16.766248,
      "lng": 98.794518
    },
    "course": 335.6,
    "speed": 66,
    "rpm": 1154,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:13",
    "location": {
      "lat": 16.766558,
      "lng": 98.794398
    },
    "course": 342.2,
    "speed": 65,
    "rpm": 1131,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:15",
    "location": {
      "lat": 16.766876,
      "lng": 98.794326
    },
    "course": 350.9,
    "speed": 64,
    "rpm": 1119,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:27",
    "location": {
      "lat": 16.76878,
      "lng": 98.794185
    },
    "course": 347.9,
    "speed": 64,
    "rpm": 1120,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:28",
    "location": {
      "lat": 16.768936,
      "lng": 98.79414
    },
    "course": 342.4,
    "speed": 65,
    "rpm": 1143,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:29",
    "location": {
      "lat": 16.76909,
      "lng": 98.794076
    },
    "course": 336.2,
    "speed": 65,
    "rpm": 1154,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:30",
    "location": {
      "lat": 16.769236,
      "lng": 98.793993
    },
    "course": 329.6,
    "speed": 67,
    "rpm": 1172,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:31",
    "location": {
      "lat": 16.769375,
      "lng": 98.79389
    },
    "course": 322.1,
    "speed": 68,
    "rpm": 1193,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:32",
    "location": {
      "lat": 16.769505,
      "lng": 98.793771
    },
    "course": 316.9,
    "speed": 69,
    "rpm": 1232,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:34",
    "location": {
      "lat": 16.769743,
      "lng": 98.793493
    },
    "course": 308.7,
    "speed": 72,
    "rpm": 1278,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:50:38",
    "location": {
      "lat": 16.77022,
      "lng": 98.792881
    },
    "course": 313.9,
    "speed": 76,
    "rpm": 1341,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:38",
    "location": {
      "lat": 16.77022,
      "lng": 98.792881
    },
    "course": 313.9,
    "speed": 76,
    "rpm": 1337,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:39",
    "location": {
      "lat": 16.770363,
      "lng": 98.792746
    },
    "course": 319.3,
    "speed": 77,
    "rpm": 1361,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:50:40",
    "location": {
      "lat": 16.770521,
      "lng": 98.792623
    },
    "course": 324.7,
    "speed": 79,
    "rpm": 1394,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:42",
    "location": {
      "lat": 16.770875,
      "lng": 98.79241
    },
    "course": 332.4,
    "speed": 83,
    "rpm": 1444,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:50:45",
    "location": {
      "lat": 16.771418,
      "lng": 98.792088
    },
    "course": 325.7,
    "speed": 82,
    "rpm": 1436,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:50:46",
    "location": {
      "lat": 16.77158,
      "lng": 98.791956
    },
    "course": 320.1,
    "speed": 82,
    "rpm": 1431,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:50:47",
    "location": {
      "lat": 16.771728,
      "lng": 98.791806
    },
    "course": 313.7,
    "speed": 82,
    "rpm": 1453,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:50:49",
    "location": {
      "lat": 16.771991,
      "lng": 98.791463
    },
    "course": 305.8,
    "speed": 85,
    "rpm": 1483,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:50:51",
    "location": {
      "lat": 16.772215,
      "lng": 98.791083
    },
    "course": 298.2,
    "speed": 85,
    "rpm": 1491,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:50:53",
    "location": {
      "lat": 16.772381,
      "lng": 98.790671
    },
    "course": 289.5,
    "speed": 85,
    "rpm": 1484,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:50:54",
    "location": {
      "lat": 16.772441,
      "lng": 98.79046
    },
    "course": 284.5,
    "speed": 84,
    "rpm": 1471,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:50:55",
    "location": {
      "lat": 16.77248,
      "lng": 98.790243
    },
    "course": 279.1,
    "speed": 84,
    "rpm": 1462,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:50:57",
    "location": {
      "lat": 16.772506,
      "lng": 98.789805
    },
    "course": 270.2,
    "speed": 83,
    "rpm": 1456,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:50:59",
    "location": {
      "lat": 16.77247,
      "lng": 98.78937
    },
    "course": 261.5,
    "speed": 83,
    "rpm": 1450,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:51:01",
    "location": {
      "lat": 16.772375,
      "lng": 98.788945
    },
    "course": 254,
    "speed": 83,
    "rpm": 1467,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:51:03",
    "location": {
      "lat": 16.772226,
      "lng": 98.788533
    },
    "course": 247.1,
    "speed": 84,
    "rpm": 1471,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:51:18",
    "location": {
      "lat": 16.770985,
      "lng": 98.78543
    },
    "course": 247,
    "speed": 86,
    "rpm": 1479,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:51:33",
    "location": {
      "lat": 16.769631,
      "lng": 98.782683
    },
    "course": 239.5,
    "speed": 72,
    "rpm": 1728,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:51:34",
    "location": {
      "lat": 16.769541,
      "lng": 98.782523
    },
    "course": 239.8,
    "speed": 71,
    "rpm": 1704,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:51:49",
    "location": {
      "lat": 16.768311,
      "lng": 98.78048
    },
    "course": 238.5,
    "speed": 53,
    "rpm": 1278,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:51:59",
    "location": {
      "lat": 16.767585,
      "lng": 98.779298
    },
    "course": 230.7,
    "speed": 56,
    "rpm": 1378,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:52:00",
    "location": {
      "lat": 16.767485,
      "lng": 98.779188
    },
    "course": 225.7,
    "speed": 58,
    "rpm": 1416,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:52:02",
    "location": {
      "lat": 16.767263,
      "lng": 98.778988
    },
    "course": 217.5,
    "speed": 59,
    "rpm": 1450,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:52:04",
    "location": {
      "lat": 16.767013,
      "lng": 98.778813
    },
    "course": 212,
    "speed": 60,
    "rpm": 1438,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:52:20",
    "location": {
      "lat": 16.765235,
      "lng": 98.777665
    },
    "course": 215.6,
    "speed": 37,
    "rpm": 1912,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:21",
    "location": {
      "lat": 16.765166,
      "lng": 98.77761
    },
    "course": 218.4,
    "speed": 33,
    "rpm": 1497,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:23",
    "location": {
      "lat": 16.765051,
      "lng": 98.7775
    },
    "course": 224.4,
    "speed": 29,
    "rpm": 1356,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:25",
    "location": {
      "lat": 16.764956,
      "lng": 98.777393
    },
    "course": 229.5,
    "speed": 26,
    "rpm": 1377,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:27",
    "location": {
      "lat": 16.764886,
      "lng": 98.777298
    },
    "course": 235,
    "speed": 20,
    "rpm": 1795,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:42",
    "location": {
      "lat": 16.76461,
      "lng": 98.77661
    },
    "course": 258.5,
    "speed": 18,
    "rpm": 1624,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:43",
    "location": {
      "lat": 16.764603,
      "lng": 98.776561
    },
    "course": 261.6,
    "speed": 18,
    "rpm": 1632,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:52:58",
    "location": {
      "lat": 16.764591,
      "lng": 98.775843
    },
    "course": 271.7,
    "speed": 18,
    "rpm": 1697,
    "fuel": 102,
    "coolant": 92
  },
  {
    "gpsdate": "2020-05-02 02:53:07",
    "location": {
      "lat": 16.764606,
      "lng": 98.775336
    },
    "course": 271.1,
    "speed": 23,
    "rpm": 2131,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 02:53:11",
    "location": {
      "lat": 16.764616,
      "lng": 98.775088
    },
    "course": 271.8,
    "speed": 22,
    "rpm": 1467,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 02:53:14",
    "location": {
      "lat": 16.764618,
      "lng": 98.774903
    },
    "course": 270.2,
    "speed": 24,
    "rpm": 1649,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 02:53:30",
    "location": {
      "lat": 16.764553,
      "lng": 98.773548
    },
    "course": 264.8,
    "speed": 38,
    "rpm": 1794,
    "fuel": 103,
    "coolant": 93
  },
  {
    "gpsdate": "2020-05-02 02:53:39",
    "location": {
      "lat": 16.764506,
      "lng": 98.772585
    },
    "course": 273.6,
    "speed": 43,
    "rpm": 1998,
    "fuel": 101,
    "coolant": 91
  },
  {
    "gpsdate": "2020-05-02 02:53:44",
    "location": {
      "lat": 16.764516,
      "lng": 98.772033
    },
    "course": 264,
    "speed": 44,
    "rpm": 2024,
    "fuel": 100,
    "coolant": 90
  },
  {
    "gpsdate": "2020-05-02 02:53:46",
    "location": {
      "lat": 16.764481,
      "lng": 98.771813
    },
    "course": 256.7,
    "speed": 41,
    "rpm": 1900,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:53:48",
    "location": {
      "lat": 16.764416,
      "lng": 98.77161
    },
    "course": 249.2,
    "speed": 41,
    "rpm": 1951,
    "fuel": 99,
    "coolant": 89
  },
  {
    "gpsdate": "2020-05-02 02:53:52",
    "location": {
      "lat": 16.764268,
      "lng": 98.771185
    },
    "course": 252.7,
    "speed": 43,
    "rpm": 1938,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:53:54",
    "location": {
      "lat": 16.764221,
      "lng": 98.770971
    },
    "course": 259.1,
    "speed": 41,
    "rpm": 1895,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:53:56",
    "location": {
      "lat": 16.764196,
      "lng": 98.770753
    },
    "course": 265.9,
    "speed": 43,
    "rpm": 1985,
    "fuel": 98,
    "coolant": 88
  },
  {
    "gpsdate": "2020-05-02 02:53:58",
    "location": {
      "lat": 16.764196,
      "lng": 98.770528
    },
    "course": 272.7,
    "speed": 42,
    "rpm": 1919,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:54:00",
    "location": {
      "lat": 16.76422,
      "lng": 98.770311
    },
    "course": 279.2,
    "speed": 41,
    "rpm": 1919,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:54:02",
    "location": {
      "lat": 16.76427,
      "lng": 98.770095
    },
    "course": 286.3,
    "speed": 43,
    "rpm": 1980,
    "fuel": 97,
    "coolant": 87
  },
  {
    "gpsdate": "2020-05-02 02:54:04",
    "location": {
      "lat": 16.764343,
      "lng": 98.769886
    },
    "course": 292.2,
    "speed": 42,
    "rpm": 1954,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:54:06",
    "location": {
      "lat": 16.764436,
      "lng": 98.769686
    },
    "course": 297.3,
    "speed": 42,
    "rpm": 1950,
    "fuel": 96,
    "coolant": 86
  },
  {
    "gpsdate": "2020-05-02 02:54:13",
    "location": {
      "lat": 16.764801,
      "lng": 98.768976
    },
    "course": 297.6,
    "speed": 45,
    "rpm": 2030,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:54:21",
    "location": {
      "lat": 16.76522,
      "lng": 98.768163
    },
    "course": 297.8,
    "speed": 43,
    "rpm": 2024,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:25",
    "location": {
      "lat": 16.765408,
      "lng": 98.76775
    },
    "course": 290.2,
    "speed": 44,
    "rpm": 2151,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:27",
    "location": {
      "lat": 16.765461,
      "lng": 98.767516
    },
    "course": 279,
    "speed": 46,
    "rpm": 2144,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:28",
    "location": {
      "lat": 16.765475,
      "lng": 98.767395
    },
    "course": 273.1,
    "speed": 46,
    "rpm": 1874,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:29",
    "location": {
      "lat": 16.765473,
      "lng": 98.767273
    },
    "course": 268.1,
    "speed": 47,
    "rpm": 1228,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:30",
    "location": {
      "lat": 16.765456,
      "lng": 98.767143
    },
    "course": 260.9,
    "speed": 51,
    "rpm": 1824,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:30",
    "location": {
      "lat": 16.765456,
      "lng": 98.767143
    },
    "course": 260.9,
    "speed": 51,
    "rpm": 1800,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:31",
    "location": {
      "lat": 16.765423,
      "lng": 98.767005
    },
    "course": 254.6,
    "speed": 54,
    "rpm": 1829,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:32",
    "location": {
      "lat": 16.765378,
      "lng": 98.76687
    },
    "course": 247.7,
    "speed": 55,
    "rpm": 1860,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:33",
    "location": {
      "lat": 16.765315,
      "lng": 98.766738
    },
    "course": 241.1,
    "speed": 56,
    "rpm": 1908,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:34",
    "location": {
      "lat": 16.765235,
      "lng": 98.766615
    },
    "course": 234,
    "speed": 58,
    "rpm": 2000,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:35",
    "location": {
      "lat": 16.765136,
      "lng": 98.766496
    },
    "course": 227.6,
    "speed": 60,
    "rpm": 2054,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:36",
    "location": {
      "lat": 16.765026,
      "lng": 98.766385
    },
    "course": 223.5,
    "speed": 61,
    "rpm": 2053,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:37",
    "location": {
      "lat": 16.764911,
      "lng": 98.766276
    },
    "course": 221.3,
    "speed": 61,
    "rpm": 2037,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:42",
    "location": {
      "lat": 16.76432,
      "lng": 98.765731
    },
    "course": 227.6,
    "speed": 64,
    "rpm": 2133,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:43",
    "location": {
      "lat": 16.764221,
      "lng": 98.7656
    },
    "course": 233.1,
    "speed": 64,
    "rpm": 2156,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:44",
    "location": {
      "lat": 16.764133,
      "lng": 98.765458
    },
    "course": 238.2,
    "speed": 64,
    "rpm": 2020,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:45",
    "location": {
      "lat": 16.76406,
      "lng": 98.765303
    },
    "course": 244.2,
    "speed": 66,
    "rpm": 1431,
    "fuel": 94,
    "coolant": 84
  },
  {
    "gpsdate": "2020-05-02 02:54:47",
    "location": {
      "lat": 16.763945,
      "lng": 98.764965
    },
    "course": 251.8,
    "speed": 69,
    "rpm": 1662,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:54:47",
    "location": {
      "lat": 16.763945,
      "lng": 98.764965
    },
    "course": 251.8,
    "speed": 69,
    "rpm": 1655,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:54:57",
    "location": {
      "lat": 16.76359,
      "lng": 98.763228
    },
    "course": 265.6,
    "speed": 65,
    "rpm": 1540,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:54:58",
    "location": {
      "lat": 16.76359,
      "lng": 98.763061
    },
    "course": 271.8,
    "speed": 63,
    "rpm": 1503,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:54:59",
    "location": {
      "lat": 16.763606,
      "lng": 98.762898
    },
    "course": 278,
    "speed": 62,
    "rpm": 1484,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:00",
    "location": {
      "lat": 16.76364,
      "lng": 98.762741
    },
    "course": 284.8,
    "speed": 61,
    "rpm": 1458,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:01",
    "location": {
      "lat": 16.76369,
      "lng": 98.762593
    },
    "course": 292.1,
    "speed": 60,
    "rpm": 1425,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:02",
    "location": {
      "lat": 16.76376,
      "lng": 98.762456
    },
    "course": 299.6,
    "speed": 58,
    "rpm": 1389,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:03",
    "location": {
      "lat": 16.763843,
      "lng": 98.762335
    },
    "course": 307.4,
    "speed": 57,
    "rpm": 1351,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:04",
    "location": {
      "lat": 16.76394,
      "lng": 98.762226
    },
    "course": 314.8,
    "speed": 56,
    "rpm": 1338,
    "fuel": 95,
    "coolant": 85
  },
  {
    "gpsdate": "2020-05-02 02:55:05",
    "location": {
      "lat": 16.764048,
      "lng": 98.762135
    },
    "course": 322.4,
    "speed": 55,
    "rpm": 1328,
    "fuel": 95,
    "coolant": 85
  }
]

export default dataSource;