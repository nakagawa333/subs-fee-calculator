"use client";

import { Box, Chip, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Step, StepLabel, Stepper, Theme, Typography, useTheme } from '@mui/material';
import { useLayoutEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function Music() {
    const [drawerWidth, setDrawerWidth] = useState<number>(240);
    const [appName, setAppName] = useState<string>("");
    const [sum, setSum] = useState<number>(0);

    const [appNames, setAppNames] = useState<string[]>([""]);
    const [sums, setSums] = useState<number[]>([0]);

    const handleChange = (event: { target: { value: string } }, index: number) => {
        let thisAppNames = [...appNames];
        thisAppNames[index] = event.target.value;
        setAppNames(thisAppNames);

        //料金 初期化
        let thisSetSums = [...sums];
        thisSetSums[index] = 0;
        setSums(thisSetSums);
    };

    const handleSumChange = (event: { target: { value: string } }, index: number) => {
        let thisSetSums = [...sums];
        thisSetSums[index] = Number(datas[appNames[index]]["plan"][event.target.value]);
        setSums(thisSetSums);
        //setSum(datas[appName]["plan"][event.target.value]);
    }

    /**
     * 追加クリック時
     */
    const addCircleIconClick = () => {
        let thisAppNames = [...appNames];
        let thisSetSums = [...sums];

        thisAppNames.push("");
        thisSetSums.push(0);

        setAppNames(thisAppNames);
        setSums(thisSetSums);
    }

    /**
     * 削除アイコンクリック時
     * @param index
     */
    const highlightOffIconClick = (index: number) => {
        if (appNames.length <= 1) {
            setSums([0]);
            setAppNames([""]);
        } else {
            let thisAppNames = [...appNames];
            //削除処理
            thisAppNames.splice(index, 1);

            let thisSums = [...sums];
            thisSums.splice(index, 1);

            setAppNames(thisAppNames);
            setSums(thisSums);
        }
    }

    const datas: any = {
        "Spotify": {
            "plan": {
                "7a71709a-88a3-0c09-cde7-6b25379e7f74": 0,
                "e7b7f11c-0856-c938-f297-3c16fcc37ac6": 480,
                "a720f3bd-dec6-2def-aa81-4dc45891a7d9": 980,
                "01dbfb10-cb3e-d0d9-d90d-d1a159ddd55c": 1280,
                "9bb21a37-17c5-ae9c-0982-6411403462f0": 1580,
            },
            "planId": {
                "7a71709a-88a3-0c09-cde7-6b25379e7f74": "free",
                "e7b7f11c-0856-c938-f297-3c16fcc37ac6": "Student",
                "a720f3bd-dec6-2def-aa81-4dc45891a7d9": "Standard",
                "01dbfb10-cb3e-d0d9-d90d-d1a159ddd55c": "Duo",
                "9bb21a37-17c5-ae9c-0982-6411403462f0": "Family",
            }
        },
        "Amazon Prime Music": {
            "plan": {
                "74e07d02-0385-e81c-9d48-ef7e0c9006e8": 0,
                "5794c797-fa39-1821-3a09-beeb20cb348f": 500,
                "82f3d8b0-b93c-826c-328b-1365c27ea666": 250
            },

            "planId": {
                "74e07d02-0385-e81c-9d48-ef7e0c9006e8": "無料",
                "5794c797-fa39-1821-3a09-beeb20cb348f": "個人",
                "82f3d8b0-b93c-826c-328b-1365c27ea666": "学生"
            }
        },
        "Amazon Music Unlimited": {
            "plan": {
                "578d161c-2dfe-d126-8416-1502b6993902": 0,
                "b1b24689-4c4c-407e-ca00-aa909018a268": 1080,
                "7c1c64ee-246b-8213-124f-e983cfa00575": 580,
                "c449e434-236d-2752-c702-009d95996309": 1680,
                "42cce277-8a81-57de-7269-de5ee703f882": 480,
                "c6a2ab7a-eec1-667d-e73b-42a6041930e4": 980,
                "5d428b50-ecde-dadd-11a0-a83a271b5bfa": 1680
            },
            "planId": {
                "578d161c-2dfe-d126-8416-1502b6993902": "無料",
                "b1b24689-4c4c-407e-ca00-aa909018a268": "個人",
                "7c1c64ee-246b-8213-124f-e983cfa00575": "学生",
                "c449e434-236d-2752-c702-009d95996309": "ファミリー",
                "42cce277-8a81-57de-7269-de5ee703f882": "ワンデバイス",
                "c6a2ab7a-eec1-667d-e73b-42a6041930e4": "プライム会員限定-個人",
                "5d428b50-ecde-dadd-11a0-a83a271b5bfa": "プライム会員限定-ファミリー"
            }
        },
        "YouTube Music": {
            "plan": {
                "0348eb46-e49f-b57c-c6de-941d4361264d": 0,
                "19f47528-45a2-0c4b-46c0-472e616ebe22": 580,
                "6ceb806c-3df8-aaab-7d4d-b139d5fc2f36": 1080,
                "5e83875e-69e1-47c7-aaeb-35a0fe6ae334": 1680,
            },
            "planId": {
                "0348eb46-e49f-b57c-c6de-941d4361264d": "無料",
                "19f47528-45a2-0c4b-46c0-472e616ebe22": "学生",
                "6ceb806c-3df8-aaab-7d4d-b139d5fc2f36": "一般",
                "5e83875e-69e1-47c7-aaeb-35a0fe6ae334": "ファミリー",
            }
        },
        "楽天 Music": {
            "plan": {
                "1b9c2be9-c19c-8574-5fcc-db38672abb73": 480,
                "26248e27-b5af-a37c-b3cb-f3a9931336a6": 500,
                "066035ac-b609-4703-76af-b64fac1b08c7": 780,
                "c93d0e6f-21f6-8cd0-0dfb-704cfa7017b3": 980
            },

            "planId": {
                "1b9c2be9-c19c-8574-5fcc-db38672abb73": "学生",
                "26248e27-b5af-a37c-b3cb-f3a9931336a6": "ライト",
                "066035ac-b609-4703-76af-b64fac1b08c7": "楽天会員",
                "c93d0e6f-21f6-8cd0-0dfb-704cfa7017b3": "スタンダードプラン"
            }
        }
    }

    return (
        <>
            <Container style={{ marginTop: "10px" }}>
                {
                    appNames && appNames.map((appName: string, index: number) => {
                        return (
                            <Box key={index}>
                                <FormControl
                                    sx={{
                                        marginLeft: {
                                            sm: `${drawerWidth}px`,
                                            paddingTop: "20px"
                                        }
                                    }}
                                >
                                    <HighlightOffIcon
                                        onClick={() => highlightOffIconClick(index)}
                                    />
                                </FormControl>
                                <FormControl
                                    sx={{
                                        m: 1,
                                        width: { xs: "100%", sm: "250px" }
                                    }}
                                >
                                    <InputLabel id="demo-multiple-chip-label">アプリ名</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={appNames[index]}
                                        onChange={(e) => handleChange(e, index)}
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

                                <FormControl sx={{ m: 1, width: { xs: "100%", sm: "250px" } }}>
                                    <InputLabel id="demo-multiple-chip-label">プラン名</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        value={datas[appName]}
                                        input={<OutlinedInput label="Name"
                                            onChange={(e) => handleSumChange(e, index)}
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
                                            style={{ fontSize: 20, paddingTop: "20px" }}
                                        >
                                            {sums[index]}円/月
                                        </Typography>
                                    </Box>
                                </FormControl>
                            </Box>
                        )
                    })
                }

                <Box sx={{
                    m: 1,
                    width: { xs: "100%", sm: "250px" },
                    marginLeft: {
                        sm: `${drawerWidth}px`
                    }
                }}>
                    <AddCircleIcon onClick={addCircleIconClick} />
                </Box>
            </Container>
        </>
    )
}
