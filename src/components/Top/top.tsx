import { Box, Container, Grid, Typography } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import BookIcon from '@mui/icons-material/Book';
import Link from "next/link";
import { Endpoint } from "@/constant/endpoint";

export default function Top() {
  const drawerWidth: number = 240;
  const fontSize: number = 80;

  return (
    <>
      <Container>
        <Box>
          <Typography>意外と見過ごしがちなサブスクの費用。どんどん契約すると思った以上に家計を圧迫します。こちらのサイトでは、各ジャンル毎にざっくりとサブスクの費用を計算できます。
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}>
            <Grid item xs={6} md={4}>
              <Link href={Endpoint.MUSIC}>
                <LibraryMusicIcon
                  style={{
                    display:"block",
                    margin: "auto",
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize:fontSize
                  }}
                />
                <Typography
                  style={{ textAlign:"center"}}
                >音楽</Typography>
              </Link>
            </Grid>

            <Grid item xs={6} md={4}>
              <Link href={Endpoint.MOVIE}>
                <LiveTvIcon
                style={{
                    display:"block",
                    margin: "auto",
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize:fontSize
                  }}
                />
                <Typography
                  style={{ textAlign:"center"}}
                >動画</Typography>
              </Link>
            </Grid>

            <Grid item xs={12} md={4}>
              <Link href={Endpoint.EBOOK}>
                <BookIcon
                style={{
                    display:"block",
                    margin: "auto",
                    color: "rgba(0, 0, 0, 0.54)",
                    fontSize:fontSize
                  }}
                />
                <Typography
                  style={{ textAlign:"center"}}
                >電子書籍</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
