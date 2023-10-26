import axios from "axios";
import { API_URL } from "./PetServices";
import { PostMessageObjType, MessageObjType } from "../types/MessagesTypes";

export const Messages_URL = `${API_URL}/api/Messages`


export function PostMessage(model: PostMessageObjType, accessToken : string) {

  return axios.post(`${Messages_URL}/SendMessage`,
      model,
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }
    );
  
  }

  export function GetReceivedMessages(userId : string, accessToken : string) {
    return axios.get<MessageObjType[]>(`${Messages_URL}/ReceivedMessages/${userId}`,
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
  }

  export function GetSentMessages(userId : string, accessToken : string) {
    return axios.get<MessageObjType[]>(`${Messages_URL}/SentMessages/${userId}`,
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    });
  }




  // public string MessageText { get; set; }
  
  // public string FromUserId { get; set; }
  
  // public string ToUserId { get; set; }
  