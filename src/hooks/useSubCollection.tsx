import React, { useEffect, useState } from 'react'
import { collection, CollectionReference, DocumentData, onSnapshot, orderBy, Query, query, QuerySnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../components/firebase';
import { useAppSelector } from '../app/hooks';

interface Messages {
    timestamp: Timestamp;
    message: string;
    user: {
      uid: string;
      photo: string;
      email: string;
      displayName: string;
    }
  }

const useSubCollection = (collectionName: string, subCollectionName: string) => {
    const channelId = useAppSelector((state) => state.channel.channelId)
    const [subDocuments, setSubdocuments] = useState<Messages[]>([]) // 5. messagesの中に残るようになる


    useEffect(() => {
        let collectionRef = collection( // 1. 参照しているcollectionの中身をsnapshotで見ていく。
          db,
          collectionName,
          String(channelId),
          subCollectionName
        )
        const collectionRefOrderBy = query(
          collectionRef,
          orderBy("timestamp", "desc")
        )
        onSnapshot(collectionRefOrderBy, (snapshot) => { // リアルタイムで情報を取得するためにonSnapshotを使う。第一引数に何を参照するのか（どこの情報をリアルタイムに出していくのか）を記述、
          let results: Messages[] = [];
          snapshot.docs.forEach((doc) => { // 2. snapshotの中に色々入っているのでforEachで一つ一つ取り出して
            results.push({　// 3. 配列の中にpushする。pushしたresultsを状態変数に入れて監視する(Messages)
              timestamp: doc.data().timestamp,
              message: doc.data().message,
              user: doc.data().user,
            })
          })
          setSubdocuments(results); //　4. results配列の中身をsetMessagesで状態を更新して
         // console.log(results)
        })
      }, [channelId]) // 各channelがクリックされるたびに発火してほしい。
  return {subDocuments}
}

export default useSubCollection