
const dataSource = [
  {
    "fleet": {
      "fleet_id": 1234,
      "fleet_name": "DEMO"
    },
    "info": {
      "vin_no": "196310",
      "licenseplate": "89-5598",
      "licenseprov": "กรุงเทพมหานคร",
      "vehicle_name": "89-5598",
      "chassis_no": "MNKFM1AK1XHX17083",
      "model": "---",
      "type": "ลากจูง",
      "brand": "HINO",
      "register_type": "รถบรรทุก ลักษณะ 9 ไม่ประจำทาง",
      "speed_limit": 80,
      "odo": 1000
    },
    "vehicles": [
      {
        "gps": {
          "imei": "9900401",
          "gpsdate": 1578134228,
          "server_date": 1572863831,
          "lat": 8.065458,
          "lng": 99.292745,
          "speed": 0,
          "io_code": "02",
          "io_name": "idling",
          "io_color": "#F86C6B",
          "acc": "t",
          "gps_stat": "true",
          "course": 251,
          "sattellite": 12,
          "sattellite_per": 80,
          "sattellite_level": 4,
          "gsm": 22,
          "gsm_per": 70,
          "gsm_level": 4,
          "engine_hour": "0",
          "location": {
            "admin_level3_name": "ต. ลำทับ",
            "admin_level2_name": "อ. ลำทับ",
            "admin_level1_name": "จ. กระบี่"
          },
          "station_nearby": "xxxx",
          "icons": {
            "icon_map": "green_w.gif",
            "color": "#FF0000"
          }
        },
        "sensor": {
          "batt_m": 4.1,
          "batt_b": 26.1,
          "batt_m_level": 4,
          "batt_b_level": 4,
          "options": {
            "temp": {
              "sensor1": 0,
              "sensor2": 0,
              "sensor3": 0,
              "sensor4": 0
            },
            "pto": 0,
            "safety_belt": "",
            "behavior": {
              "collision": "",
              "hacc": "",
              "hbrake": "",
              "hturn": ""
            }
          },
          "canbus": {
            "rpm": 0,
            "cooltemp": 0,
            "fuel_cons": 0,
            "fuel": 93,
            "fuel_per": 100,
            "acc_pedal": 0,
            "gear": "F",
            "foot_brake": "0",
            "exhaust_brake": "0",
            "hand_brake": "0",
            "clutch_switch": "0",
            "dtc_engine": ""
          }
        },
        "driver_cards": {
          "did": "",
          "card_id": "",
          "name": "",
          "type": "",
          "branch": "",
          "tel": "",
          "validate": ""
        },
        "driving_count": {
          "driving": 4023271,
          "idling": 731577,
          "parking": 5870134,
          "overspeeding": 4023271,
          "working": 0
        }
      },
      {
        "gps": {
          "imei": "9900401",
          "gpsdate": 1572863828,
          "server_date": 1572863831,
          "lat": 8.065822,
          "lng": 99.29399,
          "speed": 0,
          "io_code": "03",
          "io_name": "driving",
          "io_color": "#F86C6B",
          "acc": "t",
          "gps_stat": "true",
          "course": 251,
          "sattellite": 12,
          "sattellite_per": 80,
          "sattellite_level": 4,
          "gsm": 22,
          "gsm_per": 70.96774193548387,
          "gsm_level": 4,
          "engine_hour": "0",
          "location": {
            "admin_level3_name": "ต. ลำทับ",
            "admin_level2_name": "อ. ลำทับ",
            "admin_level1_name": "จ. กระบ"
          },
          "station_nearby": "xxxx",
          "icons": {
            "icon_map": "green_w.gif",
            "color": "#FF0000"
          }
        },
        "sensor": {
          "batt_m": 4.1,
          "batt_b": 26.1,
          "batt_m_level": 4,
          "batt_b_level": 4,
          "options": {
            "temp": {
              "sensor1": 0,
              "sensor2": 0,
              "sensor3": 0,
              "sensor4": 0
            },
            "pto": 0,
            "safety_belt": "",
            "behavior": {
              "collision": "",
              "hacc": "",
              "hbrake": "",
              "hturn": ""
            }
          },
          "canbus": {
            "rpm": 0,
            "cooltemp": 0,
            "fuel_cons": 0,
            "fuel": 93,
            "fuel_per": 100,
            "acc_pedal": 0,
            "gear": "F",
            "foot_brake": "0",
            "exhaust_brake": "0",
            "hand_brake": "0",
            "clutch_switch": "0",
            "dtc_engine": ""
          }
        },
        "driver_cards": {
          "did": "",
          "card_id": "",
          "name": "",
          "type": "",
          "branch": "",
          "tel": "",
          "validate": ""
        },
        "driving_count": {
          "driving": 4023271,
          "idling": 731577,
          "parking": 5870134,
          "overspeeding": 4023271,
          "working": 0
        }
      }
    ]
  }
]



export default {
  getData() {
    return dataSource;
  }
};
