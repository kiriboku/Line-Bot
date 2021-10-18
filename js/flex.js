module.exports.flex_news_tw = function flex_news_tw(array) {
  let text = {
    "type": "flex",
    "altText": "this is a flex message",
    "contents": {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "台股新聞",
            "size": "35px",
            "weight": "bold",
            "align": "center"
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        }
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": array[0],
              "uri": array[1]
            }
          },
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": array[2],
              "uri": array[3]
            }
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": array[4],
              "uri": array[5]
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
  }
  return text
}
module.exports.flex_news_house = function flex_news_house(array) {
  let text = {
    "type": "flex",
    "altText": "this is a flex message",
    "quickReply": {
      "items": [
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "頭條新聞",
            "text": "頭條新聞"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "台股新聞",
            "text": "台股新聞"
          }
        },
        {
          "type": "action",
          "action": {
            "type": "message",
            "label": "理財新聞",
            "text": "理財新聞"
          }
        }
      ]
    },
    "contents": {
      "type": "bubble",
      "header": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "房產新聞",
            "size": "35px",
            "weight": "bold",
            "align": "center"
          }
        ]
      },
      "hero": {
        "type": "image",
        "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": "http://linecorp.com/"
        }
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": array[0],
              "uri": array[1]
            }
          },
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": array[2],
              "uri": array[3]
            }
          },
          {
            "type": "button",
            "action": {
              "type": "uri",
              "label": array[4],
              "uri": array[5]
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
  }
  return text
}
