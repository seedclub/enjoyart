import { getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { mintNft } from '@/utils/mint';

const base = 'https://api.neynar.com/';
const api_key = process.env.NEYNAR_API_KEY as string;
const NEXT_PUBLIC_URL = 'https://www.enjoy.tech';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const TOKEN_ID = id ? Number(id) : 1;
  let accountAddress = '';
  const body = await req.json();

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT',
  });

  if (message?.button === 1) {
    let newId = Math.floor(Math.random() * 11) + 1;
    while (newId === TOKEN_ID) {
      newId = Math.floor(Math.random() * 11) + 1;
    }
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Refresh',
          },
          {
            label: `Mint`,
          },
        ],
        image: {
          src: `${NEXT_PUBLIC_URL}/frames/${newId}.jpg`,
          aspectRatio: '1:1',
        },
        postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${newId}`,
      })
    );
  }

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  const fid = message?.interactor.fid;
  const channel = 'enjoy';
  const fetchUsers: any = async (url: string, users: any[] = []) => {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        api_key,
      },
    });
    const json = await response.json();

    if (json?.users) users.push(...json?.users);

    const cursor = json?.next?.cursor;

    if (cursor) {
      const nextUrl = `${base}v2/farcaster/channel/followers?id=${channel}&limit=1000&cursor=${cursor}`;
      return fetchUsers(nextUrl, users);
    }

    return users;
  };

  const initialUrl = `${base}v2/farcaster/channel/followers?id=${channel}&limit=1000`;
  const allUsers = await fetchUsers(initialUrl);
  const userFID = allUsers.filter((user: any) => user.fid === fid)[0];

  if (userFID) {
    try {
      const mint = await mintNft(accountAddress, TOKEN_ID);
      if (mint === 'Already minted') {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [
              {
                label: `Already minted, enjoy!`,
                action: 'link',
                target: `https://www.enjoy.tech`,
              },
            ],
            image: {
              src: `${NEXT_PUBLIC_URL}/frames/${TOKEN_ID}.jpg`,
              aspectRatio: '1:1',
            },
          })
        );
      }
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `Check your wallet and enjoy`,
              action: 'link',
              target: `https://www.enjoy.tech`,
            },
          ],
          image: {
            src: `${NEXT_PUBLIC_URL}/frames/${TOKEN_ID}.jpg`,
            aspectRatio: '1:1',
          },
        })
      );
    } catch (error) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: `Mint sold out, enjoy`,
              action: 'link',
              target: `https://www.enjoy.tech`,
            },
          ],
          image: {
            src: `${NEXT_PUBLIC_URL}/frames/${TOKEN_ID}.jpg`,
            aspectRatio: '1:1',
          },
        })
      );
    }
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Refresh',
        },
        {
          label: `Follow /enjoy and try again`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/frames/${TOKEN_ID}.jpg`,
        aspectRatio: '1:1',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame?id=${TOKEN_ID}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
