import React from 'react'
import {db} from "../../configuration"
import { collection, onSnapshot } from "firebase/firestore"

export default function FetchDataHelper(setMedications) {
// set collections
const medCollection = collection(db, "Medications")

// get data
const unsubscribe = onSnapshot(medCollection, onSnapshot => {
    const medList = onSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
    setMedications(medList)
})
  return unsubscribe
}
