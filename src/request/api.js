import request from "./http"
//关于登陆的
export let Login = (username, password) => request.post("api/login", { username, password })

//关于注册的
export let Enroll = (username, password) => request.post("api/reguser", { username, password })

//获取用户信息
export let UserAdmin = () => request.get("my/userinfo")

// 更新用户
export let gx =(id,url,email,username)=>request.post("my/userinfo",{id,url,email,username})

//获取用户列表
export let UserList = () => request.get("my/users/list")

//根据id删除用户
export let UserDel = (id) => request.get(`/my/users/deluser/${id}`)
//文章类别分类
export let article = () => request.get("my/article/cates")

// 获取文章信息
export let hx =(id)=>request.get(`/my/article/cates/${id}`)

// 更新文章信息
export let bja =(id,name,alias)=>request.post(`/my/article/updatecate/${id}`,{id,name,alias})

// 根据id删除文章用户
export let articleDel = (id) => request.get(`/my/article/deletecates/${id}`)

// 获取文章列表
export let Articlelist = (size, page) => request.get("/my/article/list", {
    params: {
        size: size,
        page: page,

    },
})

// 根据id删除文章列表
export let ArticleDel = (id) => request.post('my/article/artidel', { id })


// 获取文章分类

// 文章发布
export let Release = (title, cate_id, content, cover_img, pub_date, author_id) => request.post("my/article/add",{
        title, cate_id, content, cover_img, pub_date, author_id

})

export let pwd = (id,oldPwd,newPwd) =>request.post("my/updatepwd",{id,oldPwd,newPwd})
// 文章内容
export let nr = (id)=>request.get(`my/article/details/${id}`,{})

export let xn = (id, title, cate_id, content, cover_img, pub_date, author_id)=>request.post(`my/article/details/${id}`,{id,title, cate_id, content, cover_img, pub_date, author_id})


