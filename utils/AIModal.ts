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

  history: [

  ],
});



export const AI_PROMPT: string = "Tạo kế hoạch du lịch cho địa điểm: {location}, trong {totalDays} ngày và {totalNights} đêm, cho {traveler} với ngân sách {budget} với chi tiết vận chuyển, giá vận chuyển với url Đặt phòng, danh sách tùy chọn khách sạn với Tên khách sạn, địa chỉ khách sạn, Giá. url hình ảnh khách sạn, tọa độ địa lý, xếp hạng, mô tả và Địa điểm tham quan gần đó với Tên địa điểm, Chi tiết địa điểm, Url hình ảnh địa điểm. Tọa độ địa lý, Giá vé, Thời gian t di chuyển từng địa điểm trong {totalDay} ngày {totalNight} đêm với kế hoạch mỗi ngày với thời gian tốt nhất để tham quan ở định dạng JSON convert JSON, với ngôn ngữ tiếng việt"




