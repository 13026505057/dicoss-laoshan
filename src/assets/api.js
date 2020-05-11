import service from './request'

export default {
    // 获取列表
    getArchivesList(data){
        return service({ url: '/borrowLog/getByPage', method: 'post', data }) 
    },
    // 获取列表 
    editChengStatus(data){
        return service({ url: '/cases/cases/update', method: 'post', data }) 
    },
}