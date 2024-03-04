export async function getSeller() {
  try {
    var response = await fetch(`https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': this.props.header.redisKey,
        'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
      }
    });

    var data = await response.json();
    let list = data.map(e => ({
      groupName: e.groupName,
      items: e.items,
      key: e.key, value: e.value
    }
    ))
    this.setState({
      seller: list
    })

  } catch (error) {

  }
}
