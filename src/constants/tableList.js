const tableTitle=[
    {id:0,name:'編輯'},
    {id:1,name:'合同名稱'},
    {id:2,name:'建立時間'},
    {id:3,name:'完成時間'},
    {id:4,name:'原價'},
    {id:5,name:'折扣後金額'},
]
const tableDrop= [
    {id:100000003,name:'同意'},
    {id:100000002,name:'拒絕'},
    {id:100000001,name:'經銷商已簽名待審核'},
    {id:100000000,name:'經銷商待簽名'},
]

let running=false
let detailData=[]
let tableList=[]

export {tableTitle,tableDrop,running,detailData,tableList}