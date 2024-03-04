import React, { Suspense, useRef, useState } from 'react';
import { BoxContrainer, Button } from '../../components_new';
import { Row, Col, Input, Table, Space } from 'antd';
import { FileOutlined, InfoCircleOutlined, LoadingOutlined, SearchOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Search } from '@material-ui/icons';
import { Button as ButtonAndt, message, Upload } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Highlighter from 'react-highlight-words';


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


const PreviewImportVehicle = () => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={`${selectedKeys[0] || ''}`}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <ButtonAndt
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </ButtonAndt>
                    <ButtonAndt
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </ButtonAndt>
                    <ButtonAndt
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </ButtonAndt>
                    <ButtonAndt
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </ButtonAndt>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const handleOpenModal = (d) => {

    }

    const { dataLogin } = useSelector(state => state.signin)

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
        fetch('https://yanmar-api.veconnect.vn/prod/fleet/vehicle/vehicle_allocation/import_vehicles', {
            method: 'POST',
            body: formData,
            // headers: {
            //   authorization: 'Bearer '
            // }
        })
            .then((res) => res.json())
            .then((data) => {

                message.success('Import data successfully.', 10);
                window.location.replace("#/Tractor/vehicle")
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
            fetch('https://yanmar-api.veconnect.vn/prod/fleet/vehicle/vehicle_allocation/read_excel_vehicle', {
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
            title: 'Vehicle Number',
            className: 'text-[14px] whitespace-nowrap',
            ...getColumnSearchProps('vin_no'),
            dataIndex: 'vin_no',
        },
        {
            title: 'Vehicle Model',
            className: 'text-[14px] whitespace-nowrap',
            ...getColumnSearchProps('model_code'),
            dataIndex: 'model_code',
        },
        {
            title: 'Vehicle Engine Number',
            className: 'text-[14px] whitespace-nowrap',
            ...getColumnSearchProps('engine_no'),
            dataIndex: 'engine_no',
        },
        {
            title: 'Dealer Name',
            className: 'text-[14px] whitespace-nowrap',
            ...getColumnSearchProps('dealer_name'),
            dataIndex: 'dealer_name',
        },

    ];

    return (
        <Suspense fallback={null}>
            <BoxContrainer title="Vehicle">
                <div className='content-header'>
                    <div className="flex flex-row space-x-3">
                        <div className="flex-1">
                            <Input placeholder="Search" prefix={<Search className='text-[#666]' />} />

                        </div>

                        <div className="flex-1"></div>

                        <div className="text-end">
                            <button onClick={() => {
                                handleDownloadTemplate(process.env.PUBLIC_URL + '/template/vehicle.xlsx', 'Vehicle Template Import')
                            }} className="hover:bg-[#CB353E]  hover:border-[#CB353E] border-[#888] hover:text-white btn font-medium font-pop px-4 rounded-[10px] text-[13px] py-[6px] text-[#333] mr-2">
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
                <div className="content-body min-h-[300px]">
                    <div>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            rowKey={r => r.row}
                            className="ant-table-custom"
                            columns={columns}
                            scroll={{ x: 1500 }}
                            dataSource={tableData}
                            size="small"
                        />
                    </div>
                </div>
                <div className="hr-line-dashed" />
                <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
                    <Button
                        isCancelButton={true}
                        onClick={() => window.location.replace("#/Tractor/vehicle")}
                    />

                    <Button text='Import' disabled={!validFile} isSaveButton={true} onClick={handleImport} />
                </div>
            </BoxContrainer>
        </Suspense>
    )
}

export default PreviewImportVehicle
