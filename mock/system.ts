import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/role",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          list: [
            {
              createTime: 1609837428000,
              updateTime: 1645477701000,
              creator: "admin",
              updater: "",
              deleted: false,
              tenantId: 1,
              id: 1,
              name: "super administrator",
              code: "super_admin",
              sort: 1,
              status: 0,
              type: 1,
              remark: "super administrator",
              dataScope: 1,
              dataScopeDeptIds: null
            },
            {
              createTime: 1609837428000,
              updateTime: 1645477700000,
              creator: "admin",
              updater: "",
              deleted: false,
              tenantId: 1,
              id: 2,
              name: "common role",
              code: "common",
              sort: 2,
              status: 0,
              type: 1,
              remark: "common role",
              dataScope: 2,
              dataScopeDeptIds: null
            },
            {
              createTime: 1609912175000,
              updateTime: 1647698441000,
              creator: "",
              updater: "1",
              deleted: false,
              tenantId: 1,
              id: 101,
              name: "test account",
              code: "test",
              sort: 0,
              status: 0,
              type: 2,
              remark: "132",
              dataScope: 1,
              dataScopeDeptIds: []
            }
          ],
          total: 3
        }
      };
    }
  },
  {
    url: "/dept",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: [
          {
            name: "Hangzhou Head Office",
            type: 1, // 1 Company 2 Branches 3 Departments
            parentId: 0,
            sort: 0,
            leaderUserId: 1,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 100,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "Zhengzhou Branch",
            type: 2,
            parentId: 100,
            sort: 1,
            leaderUserId: 104,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 101,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "R & D department",
            type: 3,
            parentId: 101,
            sort: 1,
            leaderUserId: 104,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 103,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "marketing department",
            type: 3,
            parentId: 102,
            sort: 1,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 108,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "Shenzhen Branch",
            type: 2,
            parentId: 100,
            sort: 2,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 102,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "marketing department",
            type: 3,
            parentId: 101,
            sort: 2,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 1,
            id: 104,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "financial department",
            type: 3,
            parentId: 102,
            sort: 2,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 109,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "testing department",
            type: 3,
            parentId: 101,
            sort: 3,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 105,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "financial department",
            type: 3,
            parentId: 101,
            sort: 4,
            leaderUserId: 103,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 1,
            id: 106,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          },
          {
            name: "Operation and maintenance department",
            type: 3,
            parentId: 101,
            sort: 5,
            leaderUserId: null,
            phone: "15888888888",
            email: "ry@qq.com",
            status: 0,
            id: 107,
            createTime: 1609837427000,
            remark: "remark, remark, remark, remark, remark, remark, remark"
          }
        ]
      };
    }
  },
  {
    url: "/user",
    method: "post",
    response: () => {
      return {
        code: 0,
        data: {
          list: [
            {
              username: "admin",
              nickname: "admin",
              remark: "administrator",
              deptId: 103,
              postIds: [1],
              mobile: "15888888888",
              sex: 0,
              id: 1,
              status: 0,
              createTime: 1609837427000,
              dept: {
                id: 103,
                name: "R & D department"
              }
            },
            {
              username: "pure",
              nickname: "pure",
              remark: "do not scare me",
              deptId: 104,
              postIds: [1],
              mobile: "15888888888",
              sex: 0,
              id: 100,
              status: 1,
              createTime: 1609981637000,
              dept: {
                id: 104,
                name: "marketing department"
              }
            },
            {
              username: "Miss",
              nickname: "girl",
              remark: null,
              deptId: 106,
              postIds: null,
              mobile: "15888888888",
              sex: 1,
              id: 103,
              status: 1,
              createTime: 1610553035000,
              dept: {
                id: 106,
                name: "financial department"
              }
            },
            {
              username: "little brother",
              nickname: "boy",
              remark: null,
              deptId: 107,
              postIds: [],
              mobile: "15888888888",
              sex: 0,
              id: 104,
              status: 0,
              createTime: 1611166433000,
              dept: {
                id: 107,
                name: "Operation and maintenance department"
              }
            }
          ],
          total: 4
        }
      };
    }
  }
] as MockMethod[];
