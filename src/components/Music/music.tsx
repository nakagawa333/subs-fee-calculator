"use client";

import { Box, Card, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Tooltip, Typography, useMediaQuery } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { UseMusicEvent } from '@/hooks/musicEvent';
import DeleteIcon from '@mui/icons-material/Delete';
import MaterialSnackbar from '../Snackbar/snackbar';
import { Content } from '@/type/content';
import MaterialSkeleton from '../Skeleton/skeleton';
import mudicContents from './mudicContents';
import MudicContents from './mudicContents';
import CircularIndeterminate from '../Circular/circular';

export default function Music() {
    const drawerWidth: number = 240;
    const smMaches: boolean = useMediaQuery("(min-width: 600px)");
    const xsMaches: boolean = useMediaQuery("(max-width: 599px)");

    const [contents,totalPrice, addCircleIconRef, datas,sucessDeleteOpen,isLoading,event] = UseMusicEvent(

    )

    return (
        <>

            <MaterialSnackbar
                severity="success"
                open={sucessDeleteOpen}
                autoHideDuration={3000}
                msg="削除しました"
                handleClose={event.sucessDeleteSnackbarClose}
            />
            <Box sx={{ borderBottom: "1px solid"}}>
                <Container>
                    <Typography sx={{fontSize:"20px",marginLeft: { sm: `${drawerWidth}px` }}}>音楽</Typography>
                </Container>
            </Box>
            <Container style={{ marginTop: "10px", borderBottom: 1 }}>
                {
                    contents && contents.map((content:Content,index:number) => {
                        return (
                            xsMaches && !isLoading ? (
                                <Card sx={{ marginBottom: "15px", boxShadow: 3 }} key={index}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <FormControl
                                            sx={{
                                                paddingTop: "15px"
                                            }}
                                        >
                                            <Tooltip title="削除する">
                                                <DeleteIcon
                                                    fontSize="large"
                                                    sx={{
                                                        marginLeft: "auto",
                                                        marginRight: 0,
                                                        display: "block"
                                                    }}
                                                    color="action"
                                                    onClick={() => event.highlightOffIconClick(index)}
                                                />
                                            </Tooltip>
                                        </FormControl>
                                        <FormControl
                                            sx={{
                                                width: "90%",
                                                margin: "auto",
                                                marginTop: "10px"
                                            }}
                                        >
                                            <InputLabel id="demo-multiple-chip-label">アプリ名</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={contents[index]?.appName}
                                                onChange={(e) => event.handleChange(e, index)}
                                                input={<OutlinedInput label="Name"
                                                />}
                                            >
                                                {Object.keys(datas).map((name) => (
                                                    <MenuItem
                                                        key={name}
                                                        value={name}
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <FormControl
                                            sx={{
                                                width: "90%",
                                                margin: "auto",
                                                marginTop: "10px"
                                            }}
                                        >
                                            <InputLabel id="demo-multiple-chip-label">プラン名</InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                value={contents[index]?.planId}
                                                input={<OutlinedInput label="Name"
                                                    onChange={(e) => event.handleSumChange(e, index)}
                                                />}
                                            >
                                                {datas[content.appName] &&
                                                    Object.keys(datas[content.appName]["plan"]).map((key: string) => (
                                                        <MenuItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {datas[content.appName]["planId"][key]}
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{ width: "90%" }}>
                                            <Box>
                                                <Typography
                                                    style={{ fontSize: 20, paddingTop: "20px", textAlign: "right" }}
                                                    sx={{
                                                        paddingLeft: "190px"
                                                    }}
                                                >
                                                    {contents[index].price}円/月
                                                </Typography>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Card>
                            ) : smMaches && !isLoading? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        }}
                                    key={index}
                                >
                                    <FormControl
                                        sx={{
                                            marginLeft: `${drawerWidth}px`,
                                            paddingTop: "15px"
                                        }}
                                        >
                                            <Tooltip title="削除する">
                                                <DeleteIcon
                                                    fontSize="large"
                                                    sx={{
                                                        marginLeft: "auto",
                                                        marginRight: 0,
                                                        display: "block"
                                                        }}
                                                    color="action"
                                                    onClick={() => event.highlightOffIconClick(index)}
                                                />
                                            </Tooltip>
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            width: "250px",
                                            marginLeft: "20px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        <InputLabel id="demo-multiple-chip-label">アプリ名</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={contents[index]?.appName}
                                            onChange={(e) => event.handleChange(e, index)}
                                            input={<OutlinedInput label="Name"
                                            />}
                                        >
                                            {Object.keys(datas).map((name) => (
                                                <MenuItem
                                                    key={name}
                                                    value={name}
                                                >
                                                    {name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        sx={{
                                            width: "250px",
                                            marginLeft: "10px",
                                            marginTop: { xs: "10px" }
                                        }}
                                    >
                                        <InputLabel id="demo-multiple-chip-label">プラン名</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            value={contents[index]?.planId}
                                            input={<OutlinedInput label="Name"
                                                onChange={(e) => event.handleSumChange(e, index)}
                                            />}
                                        >
                                            {datas[content.appName] &&
                                                Object.keys(datas[content.appName]["plan"]).map((key: string) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {datas[content.appName]["planId"][key]}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ width: { sm: "250px" } }}>
                                        <Box>
                                            <Typography
                                                style={{ fontSize: 20, paddingTop: "20px", textAlign: "right" }}
                                                sx={{
                                                    paddingLeft: { sm: "190px" }
                                                }}
                                            >
                                                {contents[index].price}円/月
                                            </Typography>
                                        </Box>
                                    </FormControl>
                                </Box>

                                ) : (
                                    <></>
                                )
                        )
                    })
                }

                {
                    isLoading ? (
                        <CircularIndeterminate
                            isLoading={isLoading}
                            color="inherit"
                        />
                    ): (
                            <></>
                    )
                }

                {
                    xsMaches && !isLoading ? (
                        <Box sx = {{
                            width: "100%"
                        }}
                            ref={addCircleIconRef}
                        >
                            <Tooltip title="追加する">
                                <AddCircleIcon
                                    onClick={() => event.addCircleIconClick()}
                                    sx={{
                                        margin: "auto",
                                        display: "block"
                                    }}
                                    fontSize="large"
                                />
                            </Tooltip>
                        </Box>
                    ): smMaches && !isLoading ?(
                            <Box sx={{
                                    width: "100%",
                                }}
                                ref={addCircleIconRef}
                            >
                                <Tooltip title="追加する">
                                    <AddCircleIcon
                                        onClick={() => event.addCircleIconClick()}
                                        sx={{
                                            margin: "auto",
                                            display: "block"
                                        }}
                                        fontSize="large"
                                    />
                                </Tooltip>
                           </Box>
                        ) : (
                                <></>
                    )
                }

                {
                    xsMaches && !isLoading? (
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 40,
                                right: 0,
                                width: 250,
                                border: "thin solid",
                                boxShadow: 1,
                                borderRadius: 2,
                                height: "30px",
                                left: "50%",
                                marginLeft: "-125px"
                            }}
                        >
                            <Box style={{ display: "flex" }}>
                                <Typography>合計:</Typography>
                                <Typography style={{ textAlign: "right" }}>{totalPrice}</Typography>
                            </Box>
                        </Box>
                    ) : smMaches && !isLoading ?(
                        <Box>
                            {totalPrice}
                        </Box>
                        ) : (
                                <></>
                    )
                }
            </Container >
        </>
    )
}
