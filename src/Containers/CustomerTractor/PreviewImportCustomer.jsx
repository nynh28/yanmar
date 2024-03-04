import React, { Suspense, useState } from 'react';
import { BoxContrainer, Button } from '../../components_new';
import { Row, Col, Input, Table } from 'antd';
import { FileOutlined, InfoCircleOutlined, LoadingOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Search } from '@material-ui/icons';
import { Button as ButtonAndt, message, Upload } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const columns = [
    {
        title: 'Status',
        dataIndex: 'status',
        className: 'text-[14px] whitespace-nowrap border-l-0',
        render: value => {
            switch (value) {
                case 0:
                    return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#B84241] bg-[#FFEAEA] text-[12px] rounded-[15px]">
                        <i className="fa fa-circle text-[9px] text-[#E85959]" aria-hidden="true"></i>
                        Error
                    </span>
                case 1:
                    return <span className="flex w-fit font-semibold items-center gap-[12px] font-pop pl-[8px] py-2 pr-[12px] text-[#4F7F54] bg-[#EBFFEE] text-[12px] rounded-[15px]">
                        <i className="fa fa-circle text-[9px] text-[#4F7F54]" aria-hidden="true"></i>
                        Approved
                    </span>

            }
        }
    },
    {
        title: 'Info',
        dataIndex: 'info',
        className: 'text-[14px] whitespace-nowrap',
        render: (value, record) => {
            return <span>
                {record.status == 0 && <InfoCircleOutlined className="text-danger mr-2 align-[-2px]" />}
                {value}
            </span>
        }
    },
    {
        title: 'Row In Excel',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'row',
    },
    {
        title: 'Prefix',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'prefix',
    },
    {
        title: 'First Name',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'name',
    },
    {
        title: 'Surname',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'surname',
    },
    {
        title: 'Dealer',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'dealer_name',
    },
    {
        title: 'Phone',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'phone',
    },
    {
        title: 'Email',
        className: 'text-[14px] whitespace-nowrap',

        dataIndex: 'email',
    },
    {
        title: 'Busines Type',
        className: 'text-[14px] whitespace-nowrap',
        dataIndex: 'busines_type',
    },
];
const data = [
    {
        "status": 0,
        "info": "Error: 'corporate_type' not found.",
        "row": 0,
        "key": 0,
        "dealer_name": "demo test",
        "name": "Test1",
        "surname": "Test2",
        "email": "Test3",
        "phone": 9349578034,
        "busines_type": "Fishery",
        "address": "Test6",
        "prefix": "Test7",
        "tax_id": 92018312,
        "corporate_type": "ee"
    },
    {
        "status": 1,
        "info": "",
        "row": 1,
        "key": 1,
        "dealer_name": "Demo Dealer",
        "name": "Test2",
        "surname": "Test3",
        "email": "Test4",
        "phone": 23423423,
        "busines_type": "Fishery",
        "address": "Test7",
        "prefix": "Test8",
        "tax_id": 123123,
        "corporate_type": "Company"
    },
    {
        "status": 0,
        "info": "Error: 'corporate_type' not found.",
        "row": 2,
        "key": 2,
        "dealer_name": "test Dealer",
        "name": "Test3",
        "surname": "Test4",
        "email": "Test5",
        "phone": 234234234,
        "busines_type": "Mining",
        "address": "Test8",
        "prefix": "Test9",
        "tax_id": 234234,
        "corporate_type": "waht"
    },
    {
        "status": 0,
        "info": "Error: 'corporate_type' not found.",
        "row": 3,
        "key": 3,
        "dealer_name": "test",
        "name": "Test4",
        "surname": "Test5",
        "email": "Test6",
        "phone": 234234,
        "busines_type": "tst",
        "address": "Test9",
        "prefix": "Test10",
        "tax_id": 234234,
        "corporate_type": "fusss"
    },
    {
        "status": 1,
        "info": "",
        "row": 4,
        "key": 4,
        "dealer_name": "Demo Dealer",
        "name": "Test5",
        "surname": "Test6",
        "email": "Test7",
        "phone": 23423423,
        "busines_type": "tes",
        "address": "Test10",
        "prefix": "Test11",
        "tax_id": 2342342,
        "corporate_type": "Company"
    }
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};


const PreviewImportCustomer = () => {

    const handleOpenModal = (d) => {

    }

    const {dataLogin} = useSelector(state => state.signin)

    const [file, setFile] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [validFile, setValidFile] = useState(false)

    const handleDownloadTemplate = (url1, filename) => {
        axios.get(url1, {
            responseType: 'blob',
            'Content-type': 'application/json'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute(
                    "download",
                    `${filename}.xlsx`
                );
                document.body.appendChild(link);
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            })
    }

    const onClickImportCSV = () => {
        document.getElementById('uploadFile').click()
    }

    const handleImport = () => {
        const formData = new FormData();
            // fileList.forEach((file) => {
            // });
            formData.append('file', file);
            formData.append('platform_id', 3);
            formData.append('user_id', dataLogin.user_id);
            // You can use any AJAX library you like
            fetch('https://yanmar-api.veconnect.vn/prod/fleet/customer/import_excel_customer', {
                method: 'POST',
                body: formData,
                // headers: {
                //   authorization: 'Bearer '
                // }
            })
            .then((res) => res.json())
            .then((data) => {

                message.success('Import data successfully.', 10);
                window.location.replace("#/Tractor/customer")
            })
            .catch(() => {
                // setTableData(data)
                message.error('Import failed.', 10);
            })
            .finally(() => {
            });
    }

    const handleChange = (event) => {
        var file = event.target.files[0];
        setTableData([])
        setValidFile(false)
        if (file) {
            const formData = new FormData();

            formData.append('file', file);
            formData.append('user_id', dataLogin.user_id);
            setUploading(true);
            // You can use any AJAX library you like
            fetch('https://yanmar-api.veconnect.vn/prod/fleet/customer/read_excel_customer', {
                method: 'POST',
                body: formData,
                // headers: {
                //   authorization: 'Bearer '
                // }
            })
                .then((res) => res.json())
                .then((data) => {
                    setFile(file)
                    let checkValid = data.result.some(i => i.status == 0)
                    setValidFile(!checkValid)
                    setTableData(data.result)
                    // setFileList([]);
                    // setTableData(data)
                    message.success('upload successfully.');
                })
                .catch(() => {
                    // setTableData(data)
                    message.error('upload failed.');
                })
                .finally(() => {
                    setTimeout(_ => {
                      setUploading(false);
                    }, 100)
                });
        }
    }

    return (
        <Suspense fallback={null}>
            <BoxContrainer title="subscription_27">
                <div className='content-header'>
                    <div className="flex flex-row space-x-3">
                        <div className="flex-1">
                            <Input placeholder="Search" prefix={<Search className='text-[#666]' />} />

                        </div>

                        <div className="flex-1"></div>

                        <div className="text-end">
                            <button onClick={() => {
                                handleDownloadTemplate(process.env.PUBLIC_URL + '/template/customer.xlsx', 'Customer Template Import')
                            }}
                             className="hover:bg-[#CB353E]  hover:border-[#CB353E] border-[#888] hover:text-white btn font-medium font-pop px-4 rounded-[10px] text-[13px] py-[6px] text-[#333] mr-2">
                                <i className="fa fa-file-download mr-2 text-[12px]"></i>
                                Download Template
                            </button>
                            <button disabled={uploading} className="outline-none disabled:bg-[#f5f5f5] disabled:border-[#c6c7c7] disabled:text-[#999] hover:bg-[#CB353E] hover:border-[#CB353E] border-[#888] hover:text-white btn font-medium font-pop px-4 rounded-[10px] text-[13px] py-[6px] text-[#333]" onClick={() => onClickImportCSV()}>
                                {uploading ? <LoadingOutlined className='mr-2 text-[#CB353E]' style={{ verticalAlign: '1px' }} /> : (<i className="fa fa-file-upload mr-2 text-[12px]"></i>)}
                                {uploading ? 'Uploading' : 'Import Excel'}

                            </button>
                            <input type='file' id='uploadFile' onChange={(e) => handleChange(e)} style={{ display: 'none' }} />
                        </div>
                    </div>
                </div>
                <div className="content-body">

                    <Table
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                        className="ant-table-custom"
                        columns={columns}
                        rowKey={r => r.row}
                        scroll={{ x: 1500 }}
                        dataSource={tableData}
                        size="small"
                    />
                </div>
                <div className="hr-line-dashed" />
                <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
                    <Button
                        isCancelButton={true}
                        onClick={() => window.location.replace("#/Tractor/customer")}
                    />

                    <Button text='Import' disabled={!validFile} isSaveButton={true} onClick={handleImport} />
                </div>
            </BoxContrainer>
        </Suspense>
    )
}

export default PreviewImportCustomer