/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/light");

var $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.setOptions({
  go_package: "../proto"
})
.addJSON({
  proto: {
    nested: {
      BaseResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          }
        }
      },
      LoginAdminRequest: {
        fields: {
          username: {
            type: "string",
            id: 1
          },
          password: {
            type: "string",
            id: 2
          },
          code: {
            type: "string",
            id: 3
          },
          id: {
            type: "string",
            id: 4
          }
        }
      },
      LoginAdminResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          token: {
            type: "string",
            id: 3
          }
        }
      },
      LogoutAdminRequest: {
        fields: {
          token: {
            type: "string",
            id: 1
          }
        }
      },
      AdminInfoResp: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          avatar: {
            type: "string",
            id: 2
          },
          job: {
            type: "string",
            id: 3
          },
          organization: {
            type: "string",
            id: 4
          },
          location: {
            type: "string",
            id: 5
          },
          email: {
            type: "string",
            id: 6
          },
          introduction: {
            type: "string",
            id: 7
          },
          personalWebsite: {
            type: "string",
            id: 8
          },
          jobName: {
            type: "string",
            id: 9
          },
          organizationName: {
            type: "string",
            id: 10
          },
          locationName: {
            type: "string",
            id: 11
          },
          phone: {
            type: "string",
            id: 12
          },
          registrationDate: {
            type: "string",
            id: 13
          },
          accountId: {
            type: "string",
            id: 14
          },
          certification: {
            type: "string",
            id: 15
          },
          role: {
            type: "string",
            id: 16
          },
          code: {
            type: "uint32",
            id: 17
          },
          msg: {
            type: "string",
            id: 18
          }
        }
      },
      Comment: {
        fields: {
          _id: {
            type: "string",
            id: 1
          },
          avatar: {
            type: "string",
            id: 2
          },
          username: {
            type: "string",
            id: 3
          },
          label: {
            type: "string",
            id: 4
          },
          createDate: {
            type: "string",
            id: 5
          },
          content: {
            type: "string",
            id: 6
          },
          children: {
            rule: "repeated",
            type: "Comment",
            id: 7
          },
          parentUsername: {
            type: "string",
            id: 8
          },
          ip: {
            type: "string",
            id: 9
          },
          ua: {
            type: "string",
            id: 10
          },
          location: {
            type: "string",
            id: 11
          },
          os: {
            type: "string",
            id: 12
          }
        }
      },
      Pagination: {
        fields: {
          countTotal: {
            type: "uint32",
            id: 1
          },
          totalPage: {
            type: "uint32",
            id: 2
          },
          currentPage: {
            type: "uint32",
            id: 3
          },
          pageSize: {
            type: "uint32",
            id: 4
          }
        }
      },
      CommentListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          list: {
            rule: "repeated",
            type: "Comment",
            id: 4
          },
          pagination: {
            type: "Pagination",
            id: 5
          }
        }
      },
      CommentAddRequest: {
        fields: {
          content: {
            type: "string",
            id: 1
          },
          articleId: {
            type: "string",
            id: 2
          },
          parentId: {
            type: "string",
            id: 3
          }
        }
      },
      CommentAddResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          data: {
            type: "Comment",
            id: 3
          }
        }
      },
      CatchMe: {
        fields: {
          git: {
            type: "string",
            id: 1
          },
          job: {
            type: "string",
            id: 2
          }
        }
      },
      AboutResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          likeNum: {
            type: "string",
            id: 3
          },
          catchMe: {
            type: "CatchMe",
            id: 4
          },
          descriptions: {
            type: "string",
            id: 5
          },
          id: {
            type: "uint32",
            id: 6
          }
        }
      },
      SiteInfoReq: {
        fields: {
          copyright: {
            type: "string",
            id: 1
          },
          descriptions: {
            type: "string",
            id: 4
          },
          beian: {
            type: "string",
            id: 5
          },
          title: {
            type: "string",
            id: 6
          },
          id: {
            type: "uint32",
            id: 7
          }
        }
      },
      SiteInfoResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          author: {
            type: "string",
            id: 3
          },
          github: {
            type: "string",
            id: 4
          },
          beian: {
            type: "string",
            id: 5
          },
          descriptions: {
            type: "string",
            id: 6
          },
          selfDescriptions: {
            type: "string",
            id: 7
          },
          id: {
            type: "uint32",
            id: 8
          },
          title: {
            type: "string",
            id: 9
          }
        }
      },
      BrowseList: {
        fields: {
          articleId: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          count: {
            type: "uint32",
            id: 3
          }
        }
      },
      TopCommentList: {
        fields: {
          articleId: {
            type: "string",
            id: 1
          },
          avatar: {
            type: "string",
            id: 2
          },
          title: {
            type: "string",
            id: 3
          },
          username: {
            type: "string",
            id: 4
          },
          content: {
            type: "string",
            id: 5
          }
        }
      },
      TopCommentResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          loveCount: {
            type: "string",
            id: 3
          },
          browseList: {
            rule: "repeated",
            type: "BrowseList",
            id: 4
          },
          topCommentList: {
            rule: "repeated",
            type: "TopCommentList",
            id: 5
          }
        }
      },
      ClassList: {
        fields: {
          count: {
            type: "uint32",
            id: 1
          },
          createDate: {
            type: "string",
            id: 2
          },
          lastModifiedDate: {
            type: "string",
            id: 3
          },
          name: {
            type: "string",
            id: 4
          },
          state: {
            type: "uint32",
            id: 5
          },
          _id: {
            type: "uint32",
            id: 6
          }
        }
      },
      ListYear: {
        fields: {
          list: {
            rule: "repeated",
            type: "ListItem",
            id: 1
          },
          year: {
            type: "string",
            id: 2
          }
        },
        nested: {
          ListItem: {
            fields: {
              createDate: {
                type: "string",
                id: 1
              },
              title: {
                type: "string",
                id: 2
              },
              _id: {
                type: "uint32",
                id: 3
              }
            }
          }
        }
      },
      ListByClass: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          articleList: {
            rule: "repeated",
            type: "ListYear",
            id: 3
          },
          classList: {
            rule: "repeated",
            type: "ClassList",
            id: 4
          }
        }
      },
      Article: {
        fields: {
          browseCount: {
            type: "uint32",
            id: 1
          },
          classId: {
            type: "uint32",
            id: 2
          },
          collectCount: {
            type: "uint32",
            id: 3
          },
          commentCount: {
            type: "uint32",
            id: 4
          },
          content: {
            type: "string",
            id: 5
          },
          createDate: {
            type: "string",
            id: 6
          },
          isHot: {
            type: "bool",
            id: 7
          },
          isRecommend: {
            type: "bool",
            id: 8
          },
          lastModifiedDate: {
            type: "string",
            id: 9
          },
          likeCount: {
            type: "uint32",
            id: 10
          },
          state: {
            type: "uint32",
            id: 11
          },
          _id: {
            type: "uint32",
            id: 12
          },
          _V: {
            type: "uint32",
            id: 13
          },
          tags: {
            rule: "repeated",
            type: "uint32",
            id: 14
          },
          title: {
            type: "string",
            id: 15
          }
        }
      },
      ArticleListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          list: {
            rule: "repeated",
            type: "Article",
            id: 3
          },
          pagination: {
            type: "Pagination",
            id: 4
          }
        }
      },
      ArticleOneResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          obj: {
            type: "Article",
            id: 3
          }
        }
      },
      CaptchaResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          id: {
            type: "string",
            id: 3
          },
          img: {
            type: "string",
            id: 4
          }
        }
      },
      ComponentMeta: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          },
          icon: {
            type: "string",
            id: 3
          },
          noCache: {
            type: "bool",
            id: 4
          },
          affix: {
            type: "bool",
            id: 5
          },
          activeMenu: {
            type: "string",
            id: 6
          }
        }
      },
      Component: {
        fields: {
          component: {
            type: "string",
            id: 1
          },
          path: {
            type: "string",
            id: 3
          },
          name: {
            type: "string",
            id: 4
          },
          meta: {
            type: "ComponentMeta",
            id: 5
          },
          hidden: {
            type: "bool",
            id: 6
          },
          children: {
            rule: "repeated",
            type: "Component",
            id: 7
          }
        }
      },
      AdminRouterResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          data: {
            rule: "repeated",
            type: "Component",
            id: 3
          }
        }
      },
      AdminCategoryAddRequest: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          description: {
            type: "string",
            id: 2
          },
          support: {
            type: "bool",
            id: 3
          }
        }
      },
      AdminCategoryListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          total: {
            type: "uint32",
            id: 3
          },
          rows: {
            rule: "repeated",
            type: "categoryBase",
            id: 4
          }
        },
        nested: {
          blogBase: {
            fields: {
              title: {
                type: "string",
                id: 1
              },
              summary: {
                type: "string",
                id: 2
              },
              headerImg: {
                type: "string",
                id: 3
              },
              comment: {
                type: "string",
                id: 4
              },
              weight: {
                type: "uint32",
                id: 5
              },
              support: {
                type: "bool",
                id: 6
              },
              createTime: {
                type: "string",
                id: 7
              }
            }
          },
          categoryBase: {
            fields: {
              title: {
                type: "string",
                id: 1
              },
              description: {
                type: "string",
                id: 2
              },
              createTime: {
                type: "string",
                id: 3
              },
              support: {
                type: "bool",
                id: 4
              },
              blogList: {
                rule: "repeated",
                type: "blogBase",
                id: 5
              },
              id: {
                type: "uint32",
                id: 6
              }
            }
          }
        }
      },
      AdminArticleAddRequest: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          summary: {
            type: "string",
            id: 2
          },
          categoryId: {
            type: "uint32",
            id: 3
          },
          support: {
            type: "bool",
            id: 4
          },
          comment: {
            type: "bool",
            id: 5
          },
          headerImgType: {
            type: "uint32",
            id: 6
          },
          headerImg: {
            type: "string",
            id: 7
          },
          weight: {
            type: "uint32",
            id: 8
          },
          tagTitleList: {
            rule: "repeated",
            type: "string",
            id: 9
          },
          content: {
            type: "string",
            id: 10
          }
        }
      },
      AdminArticleListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          total: {
            type: "uint32",
            id: 3
          },
          rows: {
            rule: "repeated",
            type: "adminArticleListBase",
            id: 4
          }
        },
        nested: {
          adminArticleListCategory: {
            fields: {
              title: {
                type: "string",
                id: 1
              },
              description: {
                type: "string",
                id: 2
              }
            }
          },
          adminArticleListBase: {
            fields: {
              title: {
                type: "string",
                id: 1
              },
              summary: {
                type: "string",
                id: 2
              },
              headerImg: {
                type: "string",
                id: 3
              },
              comment: {
                type: "bool",
                id: 4
              },
              weight: {
                type: "uint32",
                id: 5
              },
              support: {
                type: "bool",
                id: 6
              },
              createTime: {
                type: "string",
                id: 7
              },
              id: {
                type: "uint32",
                id: 8
              },
              status: {
                type: "bool",
                id: 9
              },
              category: {
                type: "adminArticleListCategory",
                id: 10
              }
            }
          }
        }
      },
      AdminArticleOneResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          title: {
            type: "string",
            id: 3
          },
          summary: {
            type: "string",
            id: 4
          },
          categoryId: {
            type: "uint32",
            id: 5
          },
          support: {
            type: "bool",
            id: 6
          },
          comment: {
            type: "bool",
            id: 7
          },
          headerImgType: {
            type: "uint32",
            id: 8
          },
          headerImg: {
            type: "string",
            id: 9
          },
          weight: {
            type: "uint32",
            id: 10
          },
          tagTitleList: {
            rule: "repeated",
            type: "string",
            id: 11
          },
          content: {
            type: "string",
            id: 12
          },
          id: {
            type: "uint32",
            id: 13
          }
        }
      },
      Tags: {
        fields: {
          _id: {
            type: "uint32",
            id: 1
          },
          name: {
            type: "string",
            id: 2
          }
        }
      },
      ListByClassResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          classList: {
            rule: "repeated",
            type: "ClassList",
            id: 3
          },
          articleList: {
            rule: "repeated",
            type: "ArticleList",
            id: 4
          },
          tags: {
            rule: "repeated",
            type: "Tags",
            id: 5
          }
        },
        nested: {
          List: {
            fields: {
              _id: {
                type: "uint32",
                id: 1
              },
              createDate: {
                type: "string",
                id: 2
              },
              title: {
                type: "string",
                id: 3
              }
            }
          },
          ClassList: {
            fields: {
              _id: {
                type: "uint32",
                id: 1
              },
              name: {
                type: "string",
                id: 2
              },
              count: {
                type: "uint32",
                id: 3
              }
            }
          },
          ArticleList: {
            fields: {
              year: {
                type: "uint32",
                id: 1
              },
              list: {
                rule: "repeated",
                type: "List",
                id: 2
              }
            }
          }
        }
      },
      AdminEditCategoryRequest: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          description: {
            type: "string",
            id: 3
          }
        }
      },
      LinkBase: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          description: {
            type: "string",
            id: 2
          },
          email: {
            type: "string",
            id: 3
          },
          url: {
            type: "string",
            id: 4
          },
          headerImg: {
            type: "string",
            id: 5
          },
          display: {
            type: "bool",
            id: 6
          },
          id: {
            type: "uint32",
            id: 7
          },
          createTime: {
            type: "string",
            id: 8
          }
        }
      },
      LinkRequest: {
        fields: {
          title: {
            type: "string",
            id: 3
          },
          description: {
            type: "string",
            id: 4
          },
          email: {
            type: "string",
            id: 5
          },
          url: {
            type: "string",
            id: 6
          },
          headerImg: {
            type: "string",
            id: 7
          },
          display: {
            type: "string",
            id: 8
          }
        }
      },
      LinkListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          total: {
            type: "uint32",
            id: 3
          },
          rows: {
            rule: "repeated",
            type: "LinkBase",
            id: 4
          }
        }
      },
      UserInfoResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          userId: {
            type: "uint32",
            id: 3
          },
          username: {
            type: "string",
            id: 4
          },
          status: {
            type: "uint32",
            id: 5
          },
          avatar: {
            type: "string",
            id: 6
          },
          linkname: {
            type: "string",
            id: 7
          },
          linkUrl: {
            type: "string",
            id: 8
          },
          linkDesc: {
            type: "string",
            id: 9
          },
          logoUrl: {
            type: "string",
            id: 10
          },
          state: {
            type: "bool",
            id: 11
          },
          label: {
            type: "uint32",
            id: 12
          },
          receiveUpdate: {
            type: "bool",
            id: 13
          },
          token: {
            type: "string",
            id: 14
          },
          verifyStatus: {
            type: "string",
            id: 15
          }
        }
      },
      UploadFileResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          url: {
            type: "string",
            id: 3
          }
        }
      },
      EditUserInfoRequest: {
        fields: {
          userId: {
            type: "uint32",
            id: 1
          },
          label: {
            type: "uint32",
            id: 2
          },
          state: {
            type: "bool",
            id: 3
          },
          linkUrl: {
            type: "string",
            id: 4
          },
          linkname: {
            type: "string",
            id: 5
          },
          linkDesc: {
            type: "string",
            id: 6
          },
          receiveUpdate: {
            type: "bool",
            id: 7
          },
          logoUrl: {
            type: "string",
            id: 8
          }
        }
      },
      UpdateAboutRequest: {
        fields: {
          content: {
            type: "string",
            id: 1
          },
          htmlContent: {
            type: "string",
            id: 2
          },
          id: {
            type: "uint32",
            id: 3
          }
        }
      },
      PanelGroupResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          blogCount: {
            type: "uint32",
            id: 3
          },
          visitorCount: {
            type: "uint32",
            id: 4
          },
          userCount: {
            type: "uint32",
            id: 5
          }
        }
      },
      LineChartDataResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          axisData: {
            rule: "repeated",
            type: "uint32",
            id: 3
          },
          expectedData: {
            rule: "repeated",
            type: "uint32",
            id: 4
          },
          actualData: {
            rule: "repeated",
            type: "uint32",
            id: 5
          }
        }
      },
      LikeOrCollectRequest: {
        fields: {
          id: {
            type: "uint32",
            id: 1
          },
          flag: {
            type: "bool",
            id: 2
          },
          isLike: {
            type: "bool",
            id: 3
          }
        }
      },
      IsLikeOrCollectResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          like: {
            type: "bool",
            id: 3
          },
          collect: {
            type: "bool",
            id: 4
          }
        }
      },
      RewardResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          wechatImage: {
            type: "string",
            id: 3
          },
          aliPayImage: {
            type: "string",
            id: 4
          },
          rewards: {
            rule: "repeated",
            type: "Rewards",
            id: 5
          }
        },
        nested: {
          Rewards: {
            fields: {
              payTime: {
                type: "string",
                id: 1
              },
              name: {
                type: "string",
                id: 2
              },
              money: {
                type: "string",
                id: 3
              },
              source: {
                type: "string",
                id: 4
              }
            }
          }
        }
      },
      QiNiuListResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          total: {
            type: "uint32",
            id: 3
          }
        },
        nested: {
          qiNiuItem: {
            fields: {
              name: {
                type: "string",
                id: 1
              },
              url: {
                type: "string",
                id: 2
              },
              createTime: {
                type: "string",
                id: 3
              },
              id: {
                type: "string",
                id: 4
              }
            }
          }
        }
      },
      LogResp: {
        fields: {
          code: {
            type: "uint32",
            id: 1
          },
          msg: {
            type: "string",
            id: 2
          },
          rows: {
            rule: "repeated",
            type: "string",
            id: 3
          }
        }
      }
    }
  }
});

module.exports = $root;
