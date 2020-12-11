const url = ''

//登錄
const Login = (data) => {
  console.log(data)
  return $.ajax({
    url: url + 'oauth/token',
    type: 'POST',
    'content-Type': 'application/x-www-form-urlencoded',
    data: data
  })
}
//表單
const ContractList = () => {
  return $.ajax({
    url: url + 'Contract/ContractList',
    type: 'GET',
    dataType:'json',
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("login_token")}`,
    },
  })
}
//個別細節
const ContractDetail = (data) => {
  return $.ajax({
    url: url + 'Contract/ContractDetail',
    type: 'POST',
    data: data,
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem("login_token")}`,
    },
  })
}

const UploadContractForReseller = (data) => {
  return $.ajax({
    url: url + 'ContractFile/UploadContractForReseller',
    type: 'POST',
    contentType: false, // Not to set any content header
    processData: false, // Not to process data
    data: data
  })
}


export default {
  Login,
  ContractList,
  ContractDetail,
  UploadContractForReseller
}
