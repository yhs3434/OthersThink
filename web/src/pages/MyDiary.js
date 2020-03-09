import React, {Component} from 'react';
import './css/MyDiary.css';
import {openDB} from '../lib/indexeddb';

class MyDiary extends Component {
    state = {
        memos: [],
        db: undefined,
        DB_NAME: undefined,
        DB_VERSION: undefined,
        DB_STORE_NAME: undefined
    }

    async componentDidMount() {
        const ret = await openDB();
        this.setState({
            db: ret,
            DB_NAME: ret.name,
            DB_VERSION: ret.version,
            DB_STORE_NAME: ret.objectStoreNames[0]
        });
        this.getAllData();
    }

    getObjectStore = (store_name, mode) => {
        if (Boolean(this.state.db)) {
            let db = this.state.db;
            return db.transaction(store_name, mode).objectStore(store_name);
        }
    }

    getAllData = () => {
        // get
        let store = this.getObjectStore(this.state.DB_STORE_NAME, 'readonly');
        let req = store.openCursor();
        let superthis = this;
        req.onsuccess = function (evt) {
            const cursor = evt.target.result;
            if (cursor) {
                req = store.get(cursor.key);
                req.onsuccess = function (evt) {
                    const value = evt.target.result;
                    superthis.setState({
                        memos: superthis.state.memos.concat(value)
                    });
                }
                cursor.continue();
            }
        }
    }

    render() {
        return(
            <div className="myDiaryWrap">
                This is My Diary page.
                {
                    console.log(this.state)
                }
                <ol>
                    {
                        this.state.memos.map((memo, i) => {
                            return(
                                <li>{memo.id} {memo.memoTitle}</li>
                            )
                        })
                    }
                </ol>
            </div>
        )
    }
}

export default MyDiary;