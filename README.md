# DesignScript

### Frontend Netlify Deploy Link: https://designscript.netlify.app/
### Backend Cyclick Deploy Link: https://magnificent-pink-horse.cyclic.app
### Frontend GiHub Link: https://github.com/Abhishek07788/DesignScript
### Backend GiHub Link: https://github.com/Abhishek07788/DesignScript-backend

#### Admin:
Admin can Add new blog, Update Blogs and delete Blogs. 
#### User:
User can see blogs, read blogs, Add their comment on each blog and delete his/her comments.
### If not registered:
If anyone how is not registered on this app then he/she can only see comments and blogs.

### Backend Routes
#### user:
"/user" => get, post, patch, delete
"/user/signup"  => get
"/user/login"  => get

#### blogs:
"/blogs" => get, post, patch, delete
"/blogs/title/${title}"  => get
"/blogs/user/${id}"  => get

#### comments:
"/comments" => get, post, patch, delete
"/comments/blog/${id}"  => get
"/comments/user/${id}"  => get
"/comments/${id}"  => get


## Features & Pages:
1. Sign up
2. Log in
3. Authentication
4. Blog Dashboard 
3. Single Blog page
4. Add your Comments to each blog 
5. See others blog & comments
6. Delete your comment
7. Add your blogs
8. Delete your blogs
9. Update your blogs
10. Password protected by CryptoJS & jwt-token
11. Search by title
12. Loading and Alert Indicators 
13. Every Page Responve 

## Tech Stack:
#### Frontend
1. HTML
2. CSS
3. React Js
4. Redux
5. Axios
6. Chakra UI
7. React Icons
8. jwt-decode

#### Backend
1. Nodejs
2. Expressjs
3. Mongodb
4. Mongoose
5. CryptoJS
6. jwt-token
7. nodemon


### Sign up:
![image](https://user-images.githubusercontent.com/104199818/229425881-cbd0c2b6-27c3-480a-b18b-776cdff3949d.png)

### Log in:
![image](https://user-images.githubusercontent.com/104199818/229425943-dc8cdbae-1d96-4a90-97e2-e2ac59056ff7.png)

### DashBoard:
![image](https://user-images.githubusercontent.com/104199818/229426119-7cebfff7-87aa-49b1-8c68-636df6cfee40.png)

### Single Blog:
![image](https://user-images.githubusercontent.com/104199818/229426251-8643507a-e332-4d54-905a-446b7062ba3c.png)
![image](https://user-images.githubusercontent.com/104199818/229426350-ba35e970-082a-4443-92f0-2757b5d27f2a.png)
![image](https://user-images.githubusercontent.com/104199818/229426409-b58d3adc-539c-4a50-90a1-76c8ca180564.png)

### Admin Panel:
![image](https://user-images.githubusercontent.com/104199818/229426521-b52ef8ec-4fd8-4ef2-a1bb-254ca6ca2504.png)

### Add New Blog:
![image](https://user-images.githubusercontent.com/104199818/229426593-56b7b51b-2b63-4b78-aee4-276825b86db4.png)

### Update Blog:
![image](https://user-images.githubusercontent.com/104199818/229426648-1274ab5b-273d-4910-aaf0-aac712b2219a.png)








