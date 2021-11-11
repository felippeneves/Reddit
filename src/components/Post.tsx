import React from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    Image
} from 'react-native';

import moment from "moment";

import { PostProps } from '../model/PostProps';

interface DetailsPostProps extends TouchableOpacityProps {
    post: PostProps;
    onSelected: (url: string, title: string) => void;
}

export default ({ post, onSelected, ...rest } : DetailsPostProps) => {

    let relativeDate = '';

    if(post.created) {
        let formattedDatePost = moment.unix(post.created).format("YYYYMMDD:hhmmss");
        relativeDate = moment(formattedDatePost, "YYYYMMDD:hhmmss").fromNow();
    }

    // const baseURL = "https://www.reddit.com/r/pics/comments/qqzuhf/daniel_radcliffe_once_wore_the_same_clothes_every/"


    const baseURL = "/{0}/{1}";

    return (
        <TouchableOpacity 
            style={styles.container}
            {...rest}
            onPress={() => { 
                let url = `https://www.reddit.com/r/pics/comments/${post.id}/${post.title}`;
                onSelected(url, post.title);
            }}
        >
            <Image 
                style={styles.image}
                source={{
                    uri: post.thumbnail,
            }}/>

            <View style={styles.containerInfos}>
                <Text style={styles.textCreatedAt}>
                    {relativeDate}
                </Text>
                <Text style={styles.textTitle}>
                    {post.title}
                </Text>
                <View style={styles.containerMoreInfos}>
                    <Text style={styles.textMoreInfos}>
                        {post.author}
                    </Text>
                    <Text style={styles.textMoreInfos}>
                        {`Score: ${post.score}`}
                    </Text>
                    <Text style={styles.textMoreInfos}>
                        {`${post.num_comments} comments`}
                    </Text>
                </View>
            </View>

        </TouchableOpacity>
    );
}

 const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
    },
    containerInfos: {
        marginLeft: 8,
        width: '80%'
    },
    textCreatedAt: {
        textAlign: 'right',
        fontSize: 12
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 8
    },
    containerMoreInfos: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textMoreInfos: {
        fontSize: 10
    }
});