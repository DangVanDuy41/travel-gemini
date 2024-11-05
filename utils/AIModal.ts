/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,

} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: "object",
    description: "Kế hoạch du lịch cho chuyến đi",
    properties: {
      travelPlan: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "Địa điểm của chuyến đi"
          },
          duration: {
            type: "string",
            description: "Thời gian của chuyến đi"
          },
          budget: {
            type: "string",
            description: "Ngân sách cho chuyến đi"
          },
          numberOfPeople: {
            type: "number",
            description: "Số lượng người tham gia chuyến đi"
          },
          geoCoordinates: {
            type: "object",
            properties: {
              latitude: {
                type: "number",
                description: "Vĩ độ của địa điểm  phải thật chính xác tuyệt đối"
              },
              longitude: {
                type: "number",
                description: "Kinh độ của địa điểm  phải thật chính xác tuyệt đối"
              },
            },
            required: ["latitude", "longitude"]
          },
          transportation: {
            type: "object",
            properties: {
              toDestination: {
                type: "object",
                properties: {
                  option: {
                    type: "string",
                    description: "Lựa chọn phương tiện đến điểm đến"
                  },
                  details: {
                    type: "string",
                    description: "Chi tiết về phương tiện"
                  },
                  bookingURL: {
                    type: "string",
                    description: "URL để đặt phương tiện"
                  },
                  price: {
                    type: "string",
                    description: "Giá của phương tiện"
                  },
                },
                required: ["option", "details", "bookingURL", "price"]
              },
              inDestination: {
                type: "object",
                properties: {
                  option: {
                    type: "string",
                    description: "Lựa chọn phương tiện tại điểm đến"
                  },
                  details: {
                    type: "string",
                    description: "Chi tiết về phương tiện tại điểm đến"
                  },
                  bookingURL: {
                    type: "string",
                    description: "URL để đặt phương tiện tại điểm đến"
                  },
                  price: {
                    type: "string",
                    description: "Giá của phương tiện tại điểm đến"
                  },
                },
                required: ["option", "details", "price"]
              },
            },
            required: ["toDestination", "inDestination"]
          },
          hotels: {
            type: "array",
            items: {
              type: "object",
              properties: {
                hotelName: {
                  type: "string",
                  description: "Tên của khách sạn"
                },
                address: {
                  type: "string",
                  description: "Địa chỉ của khách sạn"
                },
                pricePerNight: {
                  type: "string",
                  description: "Giá mỗi đêm tại khách sạn / đêm"
                },
                imageURL: {
                  type: "string",
                  description: "URL của hình ảnh khách sạn"
                },
                geoCoordinates: {
                  type: "object",
                  properties: {
                    latitude: {
                      type: "number",
                      description: "Vĩ độ của khách sạn  phải thật chính xác tuyệt đối"
                    },
                    longitude: {
                      type: "number",
                      description: "Kinh độ của khách sạn  phải thật chính xác tuyệt đối"
                    },
                  },
                  required: ["latitude", "longitude"]
                },
                rating: {
                  type: "number",
                  description: "Đánh giá của khách sạn"
                },
                description: {
                  type: "string",
                  description: "Mô tả về khách sạn"
                },              
              },
              required: ["hotelName", "address", "pricePerNight", "imageURL", "geoCoordinates", "rating", "description"]
            }
          },
          dailyItinerary: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: {
                  type: "string",
                  description: "Ngày trong lịch trình"
                },
                activitie: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      time: {
                        type: "string",
                        description: "Thời gian của hoạt động"
                      },
                      activity: {
                        type: "string",
                        description: "Tên của hoạt động"
                      },
                      description: {
                        type: "string",
                        description: "Mô tả về hoạt động 1 cách cực kỳ chi tiết,chính xác và phù hợp nhất có thể kèm theo những địa danh nổi trong khu vực"
                      },
                      bestTimeToVisit: {
                        type: "string",
                        enum: ["Morning", "Afternoon"],
                        description: "Thời gian tốt nhất để tham quan hoạt động"
                      },
                      geoCoordinates: {
                        type: "object",
                        properties: {
                          latitude: {
                            type: "number",
                            description: "Vĩ độ của hoạt động  phải thật chính xác tuyệt đối"
                          },
                          longitude: {
                            type: "number",
                            description: "Kinh độ của hoạt động phải thật chính xác tuyệt đối"
                          },
                        },
                        required: ["latitude", "longitude"]
                      },
                      ticketPrice: {
                        type: "string",
                        description: "Giá vé cho hoạt động hoặc chi phí ăn uống ,..."
                      }
                    },
                    required: ["time", "activity", "description", "geoCoordinates"]
                  }
                }
              },
              required: ["day", "activitie"]
            }
          }
        },
        required: ["location", "duration", "budget", "numberOfPeople", "geoCoordinates", "transportation", "hotels", "dailyItinerary"]
      }
    },
    required: ["travelPlan"]
  },
};


export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    // {
    //   role: "user",
    //   parts: [
    //     { text: "export interface Welcome {\ntravelPlan: TravelPlan;\n}\nexport interface TravelPlan {\ngeoCoordinates:GeoCoordinates\nlocation: string;\nduration: string;\nbudget: string;\nfamily: Family;\ntransportation:Transportation\nhotels: Hotel[];\ndailyItinerary: DailyItinerary[];\n}\nexport interface DailyItinerary {\nday:string;\nactivitie:Activity[];\n}\n\nexport interface Activity {\ntime: string,\nactivity: string;\ndescription: string;\nbestTimeToVisit: BestTimeToVisit;\ngeoCoordinates: GeoCoordinates;\nticketPrice?: string;\n}\nexport enum BestTimeToVisit {\nAfternoon = \"Afternoon\",\nMorning = \"Morning\",\n}\nexport interface GeoCoordinates {\nlatitude: number;\nlongitude: number;\n}\nexport interface Family {\nnumberOfPeople: number;\n}\n\nexport interface Hotel {\nhotelName: string;\naddress: string;\npricePerNight: string;\nimageURL: string;\ngeoCoordinates: GeoCoordinates;\nrating: number;\ndescription: string;\nnearbyPlaces: NearbyPlace[];\n}\nexport interface NearbyPlace {\nplaceName: string;\ndetails: string;\nimageURL: string;\ngeoCoordinates: GeoCoordinates;\nticketPrice: string;\ntimeToTravel: string;\n}\n\nexport interface Transportation {\n    toDestination: Destination;\n    inDestination: Destination;\n}\n\nexport interface Destination {\n    option:     string;\n    details:    string;\n    bookingURL: string;\n    price:      string;\n}\n\nTạo kế hoạch du lịch cho địa điểm: Ninh Thuận, trong 3\nngày cho gia đình với ngân sách sang trọng với chi tiết vận chuyển, giá vận chuyển với 1 url  Đặt phòng, danh sách tùy chọn khách sạn với Tên khách sạn, địa chỉ khách sạn, Giá. url hình ảnh khách sạn, tọa độ địa lý, xếp hạng, mô tả và Địa điểm tham quan gần đó với Tên địa điểm, Chi tiết địa điểm, Url hình ảnh địa điểm. Tọa độ địa lý, Giá vé, Thời gian t di chuyển từng địa điểm trong 3 ngay với kế hoạch mỗi ngày với thời gian(hh:mm) tốt nhất để tham quan ở định dạng JSON convert JSON, dữ liệu tiếng việt" },
    //   ],
    // },
    // {
    //   role: "model",
    //   parts: [
    //     { text: "```json\n{\n  \"travelPlan\": {\n    \"geoCoordinates\": {\n      \"latitude\": 11.5631,\n      \"longitude\": 109.0063\n    },\n    \"location\": \"Ninh Thuận\",\n    \"duration\": \"3 ngày, 2 đêm\",\n    \"budget\": \"Sang trọng\",\n    \"family\": {\n      \"numberOfPeople\": 4\n    },\n    \"transportation\": {\n      \"toDestination\": {\n        \"option\": \"Máy bay (đến sân bay Cam Ranh) + Thuê xe riêng\",\n        \"details\": \"Bay đến sân bay Cam Ranh (CXR), sau đó thuê xe riêng di chuyển đến Ninh Thuận (~1 tiếng).\",\n        \"bookingURL\": \"https://www.traveloka.com/vi-vn/\",\n        \"price\": \"2.000.000 VND (vé máy bay khứ hồi) + 1.500.000 VND (thuê xe)\"\n      },\n      \"inDestination\": {\n        \"option\": \"Thuê xe riêng\",\n        \"details\": \"Thuê xe riêng với tài xế cho 3 ngày để di chuyển thuận tiện.\",\n        \"bookingURL\": \"\",\n        \"price\": \"3.000.000 VND\"\n      }\n    },\n    \"hotels\": [\n      {\n        \"hotelName\": \"Amanoi Resort Ninh Thuận\",\n        \"address\": \"Vĩnh Hy, Vĩnh Hải, Ninh Hải, Ninh Thuận\",\n        \"pricePerNight\": \"20.000.000 VND\",\n        \"imageURL\": \"https://www.amanoi.com/img/home/gallery/01.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 11.3361,\n          \"longitude\": 109.1184\n        },\n        \"rating\": 5,\n        \"description\": \"Khu nghỉ dưỡng sang trọng bậc nhất với kiến trúc độc đáo, tầm nhìn hướng biển tuyệt đẹp và dịch vụ đẳng cấp.\",\n        \"nearbyPlaces\": [\n          {\n            \"placeName\": \"Vịnh Vĩnh Hy\",\n            \"details\": \"Vịnh biển đẹp hoang sơ với nước biển trong xanh, thích hợp cho các hoạt động tắm biển, lặn ngắm.\",\n            \"imageURL\": \"https://example.com/vinhvinhy.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 11.3484,\n              \"longitude\": 109.1303\n            },\n            \"ticketPrice\": \"Miễn phí\",\n            \"timeToTravel\": \"5 phút\"\n          }\n        ]\n      },\n      {\n        \"hotelName\": \"Six Senses Ninh Van Bay\",\n        \"address\": \"Ninh Vân, Ninh Hòa, Khánh Hòa (Ninh Thuận)\",\n        \"pricePerNight\": \"15.000.000 VND\",\n        \"imageURL\": \"https://www.sixsenses.com/content/dam/six-senses/com/ninh-van-bay/resort-images/gallery/six-senses-ninh-van-bay-resort-gallery-01.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 12.0664,\n          \"longitude\": 109.2154\n        },\n        \"rating\": 5,\n        \"description\": \"Khu nghỉ dưỡng biệt lập trên bán đảo với các villa riêng tư, hòa mình vào thiên nhiên hoang sơ.\",\n        \"nearbyPlaces\": [\n          {\n            \"placeName\": \"Hòn Mun\",\n            \"details\": \"Hòn đảo nổi tiếng với hoạt động lặn biển ngắm san hô.\",\n            \"imageURL\": \"https://example.com/honmun.jpg\",\n            \"geoCoordinates\": {\n              \"latitude\": 12.0186,\n              \"longitude\": 109.2221\n            },\n            \"ticketPrice\": \"200.000 VND\",\n            \"timeToTravel\": \"30 phút bằng tàu\"\n          }\n        ]\n      }\n    ],\n    \"dailyItinerary\": [\n      {\n        \"day\": \"Ngày 1\",\n        \"activitie\": [\n          {\n            \"time\": \"08:00\",\n            \"activity\": \"Di chuyển đến Ninh Thuận\",\n            \"description\": \"Bay đến sân bay Cam Ranh, nhận xe và di chuyển về khách sạn.\",\n            \"bestTimeToVisit\": \"Morning\",\n            \"geoCoordinates\": {\n              \"latitude\": 0,\n              \"longitude\": 0\n            }\n          },\n          {\n            \"time\": \"15:00\",\n            \"activity\": \"Nhận phòng khách sạn và nghỉ ngơi\",\n            \"description\": \"Tận hưởng các tiện nghi của khách sạn, dạo chơi và thư giãn.\",\n            \"bestTimeToVisit\": \"Afternoon\",\n            \"geoCoordinates\": {\n              \"latitude\": 0,\n              \"longitude\": 0\n            }\n          }\n        ]\n      },\n      {\n        \"day\": \"Ngày 2\",\n        \"activitie\": [\n          {\n            \"time\": \"09:00\",\n            \"activity\": \"Khám phá Vịnh Vĩnh Hy\",\n            \"description\": \"Tham gia tour du thuyền khám phá vịnh, tắm biển, lặn ngắm san hô.\",\n            \"bestTimeToVisit\": \"Morning\",\n            \"geoCoordinates\": {\n              \"latitude\": 11.3484,\n              \"longitude\": 109.1303\n            },\n            \"ticketPrice\": \"500.000 VND\"\n          },\n          {\n            \"time\": \"15:00\",\n            \"activity\": \"Thăm quan Hang Rái\",\n            \"description\": \"Chiêm ngưỡng cảnh quan độc đáo với những vách đá, hang động và ghềnh đá.\",\n            \"bestTimeToVisit\": \"Afternoon\",\n            \"geoCoordinates\": {\n              \"latitude\": 11.4517,\n              \"longitude\": 109.1666\n            },\n            \"ticketPrice\": \"50.000 VND\"\n          }\n        ]\n      },\n      {\n        \"day\": \"Ngày 3\",\n        \"activitie\": [\n          {\n            \"time\": \"08:00\",\n            \"activity\": \"Tham quan vườn nho Thái An\",\n            \"description\": \"Tìm hiểu về quy trình trồng nho và thưởng thức nho tươi ngon.\",\n            \"bestTimeToVisit\": \"Morning\",\n            \"geoCoordinates\": {\n              \"latitude\": 11.6443,\n              \"longitude\": 108.9158\n            },\n            \"ticketPrice\": \"50.000 VND\"\n          },\n          {\n            \"time\": \"14:00\",\n            \"activity\": \"Rời Ninh Thuận\",\n            \"description\": \"Di chuyển ra sân bay Cam Ranh để về lại điểm xuất phát.\",\n            \"bestTimeToVisit\": \"Afternoon\",\n            \"geoCoordinates\": {\n              \"latitude\": 0,\n              \"longitude\": 0\n            }\n          }\n        ]\n      }\n    ]\n  }\n}\n```\n\n**Lưu ý:**\n\n* Đã cập nhật thời gian theo định dạng hh:mm cho các hoạt động trong lịch trình.\n*  Đã cung cấp 1 URL để đặt vé máy bay và khách sạn. \n*  Giá vé và thông tin đặt chỗ chỉ mang tính chất tham khảo, bạn nên kiểm tra lại trước khi khởi hành. \n*  Bạn có thể thay đổi lịch trình, khách sạn và hoạt động cho phù hợp với sở thích và ngân sách của gia đình. \n\n" },
    //   ],
    // },
  ],
});



export const AI_PROMPT: string = "Tạo kế hoạch du lịch cho địa điểm: {location}, trong {totalDays} ngày và {totalNights} đêm, cho {traveler} với ngân sách {budget} với chi tiết vận chuyển, giá vận chuyển với url Đặt phòng, danh sách tùy chọn khách sạn với Tên khách sạn, địa chỉ khách sạn, Giá. url hình ảnh khách sạn, tọa độ địa lý, xếp hạng, mô tả và Địa điểm tham quan gần đó với Tên địa điểm, Chi tiết địa điểm, Url hình ảnh địa điểm. Tọa độ địa lý, Giá vé, Thời gian t di chuyển từng địa điểm trong {totalDay} ngày {totalNight} đêm với kế hoạch mỗi ngày với thời gian tốt nhất để tham quan ở định dạng JSON convert JSON"




