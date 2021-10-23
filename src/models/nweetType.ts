export interface NweetsType {
  id: string;
  text?: string;
  userId?: string;
  userNickName?: string;
  userPhotoURL?: string;
  createdAd: number;
  fileUrl?: string;
  like: string[];
  relay: string[];
  relayList?: NweetsType[];
  parent: string;
}
