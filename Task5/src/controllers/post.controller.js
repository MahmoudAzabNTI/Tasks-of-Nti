let data = [];
readJSONFile = () => {
    try{
        data = JSON.parse( fs.readFileSync('src/models/data.json').toString());
        if(!Array.isArray(data)) throw new Error()
        return data;
    }catch(e){
        data = [];
    }
}
writeJSONFile = () => {
    fs.writeFileSync('src/models/data.json',JSON.stringify(data))
}
class Post {
    addNewPost(name, age, balance){
        let newPost = {
            id: new Date().getTime(),
            name, age ,balance
        }
        data.push(newPost);
        writeJSONFile();
    }
    editPost(PostId, newData) {
        readJSONFile();
        let index = data.findIndex(Post => Post.id == PostId);
        newData.id = data[index].id  
        data[index] = newData;
        writeJSONFile();
    }
    deletePost(PostId){
        readJSONFile()
        let index = data.findIndex(Post=> Post._id === PostId)
        data.splice(index, 1)
        writeJSONFile()
    }
    showAllPosts(){
        readJSONFile();
        return data;
    }
    showSingelPost(){

    }
    searchPost(PostId){
        readJSONFile()
        console.log(data);
        let index = data.findIndex(Post=> Post.id == PostId)
        return data[index]
    }
}
let newPost = new Post();
module.exports = newPost;