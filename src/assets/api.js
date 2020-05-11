import service from './request'

export default {
    // 获取借阅中/借阅历史列表
    getArchivesList(data){
        return service({ url: '/borrowLog/getByPage', method: 'post', data }) 
    }, 
    // 修改上传文件状态 
    editChengStatus(data){
        return service({ url: '/cases/cases/update', method: 'post', data }) 
    },
    // 获取待出库列表 
    getWaitOutByPage(data){
        return service({ url: '/user/approve/getWaitOutByPage', method: 'post', data }) 
    },
    // 提交出库申请 
    sendApproveInfo(data){
        return service({ url: '/user/approve/out', method: 'post', data }) 
    },
    // 获取借阅中列表 
    getBorrowList(data){
        return service({ url: '/borrowLog/getOutByPage', method: 'post', data }) 
    },
    // 提交借阅历史申请 
    getHistoryList(data){
        return service({ url: '/borrowLog/getBackByPage', method: 'post', data }) 
    },
}