const memeHeaders = new Headers();

export async function getMemeImg() {
  const requestOptions = {
    method: 'GET',
    headers: memeHeaders,
    redirect: 'follow',
  };
  const response = await fetch(`https://api.imgflip.com/get_memes`, requestOptions);
  const result = await response.json();
  return result.data.memes;
}
