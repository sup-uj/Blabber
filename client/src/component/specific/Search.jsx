import React, { useState } from 'react'
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
    Dialog,
    DialogTitle,
    InputAdornment,
    List,
    Stack,
    TextField,
} from "@mui/material";
import { sampleUsers } from '../../constants/sampleData';
import UserItem from '../shared/UserItem';



const Search = () => {

    const search = useInputValidation("");

    let isLoadingSendFriendRequest=false;

    const [users, setUsers] = useState(sampleUsers);

    const addFriendHandler = async (id) => {
        console.log(id);
    };

    return (
        <Dialog open >
            <Stack p={"2rem"} direction={"column"} width={"25rem"}>
                <DialogTitle textAlign={"center"}>Find People</DialogTitle>
                <TextField
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <List>
                    {users.map((i) => (
                        <UserItem
                            user={i}
                            key={i._id}
                            handler={addFriendHandler}
                            handlerIsLoading={isLoadingSendFriendRequest}
                        />
                    ))}
                </List>
            </Stack>
        </Dialog>
    );
};

export default Search;