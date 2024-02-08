import { View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import Post from "../components/Post";
import React, {useEffect, useState} from "react";
import {axiosInstance} from "../API";
import SearchBar from "../components/SearchBar";

const HomeScreen =({ navigation }) => {

    const [isLoading, setIsLoading] = useState(true)
    const [items, setItems] = useState([])
    const [query, setQuery] = useState("")
    const [clicked, setClicked] = useState(false)


    const fetchPosts = () => {
        setIsLoading(true)
        axiosInstance
            .get(`/services/search?query=${query}`)
            .then(({data}) => {
                setItems(data["services"])
            })
            .catch((err) => {
                alert(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(fetchPosts, [query])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id: item.id, name: item.name })}>
            <Post navigation={navigation} id={item.id} name={item.name} item={item} />
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#e0f7fa', paddingBottom: 75 }}>

            <SearchBar searchPhrase={query} setSearchPhrase={setQuery} clicked={clicked} setClicked={setClicked} />

            <FlatList
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
                data={items}
                renderItem={renderItem}
            />

        </View>
    );
}

export default HomeScreen;
