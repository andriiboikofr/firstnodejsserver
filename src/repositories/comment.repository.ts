import appDataSource from "../";
import {Comment} from "../models";

export interface ICommentPayload{
    content: string;
    postId: number;
    userId: number;
}

export interface IExistingCommentPayload extends ICommentPayload{
    id: number;
}

export const getComments = async (): Promise<Array<Comment>>=>{
    const commentRepository = appDataSource.getRepository(Comment);
    return commentRepository.find();
};

export const createComment= async (payload: ICommentPayload): Promise<Comment>=>{
    const commentRepository=appDataSource.getRepository(Comment);
    const comment= new Comment();
    return commentRepository.save({
        ...comment,
        ...payload,
    });
};

export const getComment=async (id:number): Promise<Comment | null>=>{
    const commentRepository=appDataSource.getRepository(Comment);
    const comment= await commentRepository.findOneBy({id:id});
    if(!comment) return null;
    return comment;
};

export const deleteComment=async (id: number): Promise <Comment| null>=>{
    const commentRepository=appDataSource.getRepository(Comment);
    const comment=await commentRepository.delete({id:id});
    return null;
};

export const updateComment=async (payload: IExistingCommentPayload): Promise<Comment|null>=>{
    const commentRepository=appDataSource.getRepository(Comment);
    const comment= await commentRepository.findOneBy({id:payload.id});
    if(!comment) return null;
    return commentRepository.save({
        ...comment,
        ...payload,
    });
};