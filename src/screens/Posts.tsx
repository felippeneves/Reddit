import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, RefreshControl, StyleSheet, View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';

import moment from "moment";

import Post from '../components/Post';
import TabLayoutButtons from '../components/TabLayoutButtons';

import { PostProps }  from '../model/PostProps';
import { ButtonProps } from '../model/ButtonProps';

import api from '../service/api';

export const BUTTON_ID_NEW = 0;
export const BUTTON_ID_TOP = 1;
export const BUTTON_ID_POPULAR = 2;
export const BUTTON_ID_HOT = 3;

export default () => {

    const navigation = useNavigation();
    const [listPosts, setListPosts] = useState<PostProps[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const loadPosts = async () => {
        const { data } = await api.get('r/pics/hot.json');

        if(data) {
            interpretData(data.data.children);
        }
    }

    useEffect(() => {
        loadPosts();
    }, []);

    const interpretData = (jsonArray: any) => {
        let list: PostProps[] = [];

        for(let i = 0; i < jsonArray.length; i++) {
            
            let element = jsonArray[i].data;
            let post: PostProps = { id: element.id,  thumbnail: element.thumbnail, 
                title: element.title, author: element.author, score: element.score,
                num_comments: element.num_comments, created: element.created };

            list.push(post);
        }

        list.sort((a, b) => {
            if(a.created < b.created) {
                return 1;
            }

            if(a.created > b.created) {
                return -1;
            }    

            return 0;
        });

        setListPosts(list);
    }

    const sortByCreated = () => {
        return listPosts.sort((a, b) => {
            if(a.created < b.created) {
                return 1;
            }

            if(a.created > b.created) {
                return -1;
            }    

            return 0;
        });
    }

    const sortByScore = () => {
        return listPosts.sort((a, b) => {
            if(a.score < b.score) {
                return 1;
            }

            if(a.score > b.score) {
                return -1;
            }
            return 0;
        });
    }

    const sortByNumComments = () => {
        return listPosts.sort((a, b) => {
            if(a.num_comments < b.num_comments) {
                return 1;
            }

            if(a.num_comments > b.num_comments) {
                return -1;
            }
            return 0;
        });
    }

    const handleButtonSelected = (id: number) => {
        if(listPosts) {
            switch (id) {
                case BUTTON_ID_NEW:
                    setListPosts(() => [...sortByCreated()]);
                    break;
                case BUTTON_ID_TOP:
                    setListPosts(() => [...sortByScore()]);
                    break;
                case BUTTON_ID_POPULAR:
                    setListPosts(() => [...sortByNumComments()]);
                    break;
                case BUTTON_ID_HOT:
                    Alert.alert("I didn't understand this");
                    break;
            }
        }
    }

    const handlePostSelected = (url: string, title: string) => {
        navigation.dispatch(
            CommonActions.navigate({
                name: 'WebViewPost',
                params: {
                    url,
                    title
                }
            })
        );
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadPosts();
        setRefreshing(false);
    }, []);

    let buttons: ButtonProps[] = [
        { id: BUTTON_ID_NEW, title: 'New'},
        { id: BUTTON_ID_TOP, title: 'Top'},
        { id: BUTTON_ID_POPULAR, title: 'Popular'},
        { id: BUTTON_ID_HOT, title: 'Hot'},
    ];

    return (
        <View style={styles.container}>
            <TabLayoutButtons 
                listButtons={buttons}
                onSelected={handleButtonSelected}
            />
            <FlatList 
                data={listPosts}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <Post 
                        post={item}
                        onSelected={handlePostSelected}/>
                )}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});