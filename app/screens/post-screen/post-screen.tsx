import * as React from "react"
import { View, ViewStyle, FlatList, TouchableOpacity } from "react-native"
import { toJS } from 'mobx'
import { observer } from "mobx-react-lite"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { useStores } from "../../models/root-store"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: 'white',
}

export const PostItem = ({ post, onPress, }: { post: any, onPress: (news: any) => void }) => {
    return (
        <TouchableOpacity
            onPress={() => onPress(post)}
            style={{ flex: 1, backgroundColor: 'grey', marginVertical: 10, marginHorizontal: 10 }}>
            <Text style={{ color: 'black', fontWeight: 'bold', width: '100%', marginBottom: 10 }}>
                {post && post.title}
            </Text>
            <Text style={{ color: 'black', width: '100%', marginBottom: 10 }}>
                {post && 'URL:' + post.url}
            </Text>
            <Text style={{ color: 'black', width: '100%', marginBottom: 10 }}>
                {post && 'Created:' + post.created_at}
            </Text>
            <Text style={{ color: 'black', width: '100%', marginBottom: 10 }}>
                {post && 'Author:' + post.author}
            </Text>
        </TouchableOpacity>

    )

}
export interface PostScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}
export const PostScreen: React.FunctionComponent<PostScreenProps> = observer(props => {
    const { postStore } = useStores();

    React.useEffect(() => {
        postStore.getPosts();
        // Interval 
        const interval = setInterval(() => {
            postStore.getLoadMorePosts();

        }, 10000);
        return () => {
            clearInterval(interval);
        }
    }, [])

    const onPress = (post: any) => {
        postStore.updatePostDetails(post);
        props.navigation.navigate('PostDetail');
    }
    // Handle Pagination
    const onEndReached = () => {

        if (!postStore.loading) {
            postStore.getLoadMorePosts();
        }

    }

    return (
        <View style={FULL}>
            <Screen style={CONTAINER} preset="fixed" backgroundColor={'white'}>
                <FlatList
                    data={toJS(postStore.posts)}
                    renderItem={({ item }) => <PostItem post={item} onPress={onPress} />}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                />
            </Screen>
        </View>
    )
})