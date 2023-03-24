import appDataSource from "../";
import {Post} from "../models";

export interface IPostPayload{
    title: string;
    content: string;
    userId: number;
}

export interface IExistingPostPayload extends IPostPayload{
    id: number;
}

export const getPosts = async (): Promise<Array<Post>>=>{
    const postRepository = appDataSource.getRepository(Post);
    return postRepository.find();
};

export const createPost= async (payload: IPostPayload): Promise<Post>=>{
    const postRepository=appDataSource.getRepository(Post);
    const post= new Post();
    console.log("POST PAYLOAD --- ",payload)
    return postRepository.save({
        ...post,
        ...payload,
    });
};

export const getPost=async (id:number): Promise<Post | null>=>{
    const postRepository=appDataSource.getRepository(Post);
    const post= await postRepository.findOneBy({id:id});
    if(!post) return null;
    return post;
};

export const deletePost=async (id: number): Promise <Post| null>=>{
    const postRepository=appDataSource.getRepository(Post);
    const post=await postRepository.delete({id:id});
    return null;
};

export const updatePost=async (payload: IExistingPostPayload): Promise<Post|null>=>{
    const postRepository=appDataSource.getRepository(Post);
    const post= await postRepository.findOneBy({id:payload.id});
    if(!post) return null;
    return postRepository.save({
        ...post,
        ...payload,
    });
};