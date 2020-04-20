import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text } from "../../components"
import { useStores } from "../../models/root-store"


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    backgroundColor: 'white',
}


export interface PostDetailScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}
export const PostDetailScreen: React.FunctionComponent<PostDetailScreenProps> = observer(props => {
    const { postStore } = useStores();

    const TitleTextStyle: TextStyle = {
        color: 'black', fontWeight: 'bold', width: '100%', marginBottom: 10, marginHorizontal: 10
    }
    const TextStyle: TextStyle = {
        color: 'black', width: '100%', marginBottom: 10, marginHorizontal: 10
    }


    React.useEffect(() => {
        console.tron.log('postStore', postStore.postDetails);
    }, [])


    return (
        <View style={FULL}>
            <Screen style={CONTAINER} preset="fixed" backgroundColor={'white'}>
                <Text style={TitleTextStyle}>
                    {postStore.postDetails && 'title:' + postStore.postDetails.title}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && postStore.postDetails.created_at}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'url:' + postStore.postDetails.url}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'author:' + postStore.postDetails.author}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'points:' + postStore.postDetails.points}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'story_text:' + postStore.postDetails.story_text}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'comment_text:' + postStore.postDetails.comment_text}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'num_comments:' + postStore.postDetails.num_comments}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'story_id:' + postStore.postDetails.story_id}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'story_title:' + postStore.postDetails.story_title}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'story_url:' + postStore.postDetails.story_url}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'parent_id:' + postStore.postDetails.parent_id}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'created_at_i:' + postStore.postDetails.created_at_i}
                </Text>
                <Text style={TextStyle}>
                    {postStore.postDetails && 'objectID:' + postStore.postDetails.objectID}
                </Text>
            </Screen>
        </View >
    )
})