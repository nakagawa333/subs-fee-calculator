"use client";

import { Box, Card, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography, useMediaQuery } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { UseMusicEvent } from '@/hooks/musicEvent';

export default function Music() {
    const drawerWidth: number = 240;
    const smMaches: boolean = useMediaQuery("(min-width: 600px)");
    const xsMaches: boolean = useMediaQuery("(max-width: 599px)");

    const [appNames, sums, totalPrice, addCircleIconRef, datas,event] = UseMusicEvent(

    )

    return (
        <>
            <Box sx={{ borderBottom: "1px solid"}}>
                <Container>
                    <Typography sx={{fontSize:"20px",marginLeft: { sm: `${drawerWidth}px` }}}>音楽</Typography>
                </Container>
            </Box>
            <Container style={{ marginTop: "10px",borderBottom: 1 }}>
                {
                    appNames && appNames.map((appName: string, index: number) => {
                        return (
                            xsMaches ? (
                                <Card sx={{ marginBottom: "15px", boxShadow: 3 }}>
                                    <Box key={index}
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
                                            <HighlightOffIcon
                                                fontSize="large"
                                                sx={{
                                                    marginLeft: "auto",
                                                    marginRight: 0,
                                                    display: "block"
                                                }}
                                                onClick={() => event.highlightOffIconClick(index)}
                                            />
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
                                                value={appNames[index]}
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
                                                value={datas[appName]}
                                                input={<OutlinedInput label="Name"
                                                    onChange={(e) => event.handleSumChange(e, index)}
                                                />}
                                            >
                                                {datas[appName] &&
                                                    Object.keys(datas[appName]["plan"]).map((key: string) => (
                                                        <MenuItem
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {datas[appName]["planId"][key]}
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
                                                    {sums[index]}円/月
                                                </Typography>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Card>
                            ) : smMaches ? (
                                <Box key={index}
                                    sx={{
                                        display: "flex",
                                    }}
                                >
                                    <FormControl
                                        sx={{
                                            marginLeft: `${drawerWidth}px`,
                                            paddingTop: "15px"
                                        }}
                                    >
                                        <HighlightOffIcon
                                            fontSize="large"
                                            sx={{
                                                marginLeft: "auto",
                                                marginRight: 0,
                                                display: "block"
                                            }}
                                            onClick={() => event.highlightOffIconClick(index)}
                                        />
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
                                            value={appNames[index]}
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
                                            value={datas[appName]}
                                            input={<OutlinedInput label="Name"
                                                onChange={(e) => event.handleSumChange(e, index)}
                                            />}
                                        >
                                            {datas[appName] &&
                                                Object.keys(datas[appName]["plan"]).map((key: string) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {datas[appName]["planId"][key]}
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
                                                {sums[index]}円/月
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
                    xsMaches ? (
                        <Box sx = {{
                            width: "100%"
                        }}
                            ref={addCircleIconRef}
                        >
                        <AddCircleIcon
                            onClick={() => event.addCircleIconClick()}
                            sx={{
                                margin: "auto",
                                display: "block"
                            }}
                            fontSize="large"
                                />
                        </Box>
                    ): (
                            <Box sx={{
                                width: "100%",
                        }}
                            ref={addCircleIconRef}
                        >
                        <AddCircleIcon
                            onClick={() => event.addCircleIconClick()}
                            sx={{
                                margin: "auto",
                                display: "block"
                            }}
                            fontSize="large"
                                />
                        </Box>
                    )
                }

                {
                    xsMaches ? (
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
                    ) : (
                        <Box>
                            {totalPrice}
                        </Box>
                    )
                }
            </Container >
        </>
    )
}
