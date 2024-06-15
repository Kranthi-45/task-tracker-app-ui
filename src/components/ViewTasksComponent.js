import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Popover, Space, Table, Tag, Tooltip } from 'antd';
import qs from 'qs';
import { DeleteOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { BASE_APP_URL } from '../constant';
// import 'antd/antd.css';  // Make sure this import is present in your project

// import "antd/dist/antd.css";

import 'antd/dist/reset.css';

const dataSet = [
    {
        key: '1',
        id: "1",
        name: 'John Brown',
        task:"Filling Excel",
        progress:"Inprogress",
        taskTodo: "Need to Learn Nextjs",
        leave: "Leave on 16th june",
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        id: "2",
        name: 'Jim Green',
        task:"SQL reports",
        progress:"Completed",
        taskTodo: "Need to work UI task",
        leave: "-",
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        id: "3",
        name: 'Joe Black',
        task:"Data Migratoin",
        progress:"Not Started",
        taskTodo: "Need to work Backend task",
        leave: "-",
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

const ViewTasksComponent = (props) => {

    const [hoveredCell, setHoveredCell] = useState(null);


    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        fetchData();
    }, [tableParams.pagination?.current, tableParams.pagination?.pageSize]);

    const fetchData = () => {
        setLoading(true);
        // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
        getAllTasksDetails()
            //   .then((res) => res.json())
            //   .then(({ results }) => {
            .then((results) => {
                console.log("results", results);
                setData(results);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                        // 200 is mock data, you should read it from server
                        // total: data.totalCount,
                    },
                });
            });
    };

    async function getAllTasksDetails() {
        console.log("getAllTasksDetails", dataSet);
        return dataSet;
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });

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
                    // width: "20px"
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 70,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
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
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
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


    const handleDeleteForm = (e) => {
        console.log("Delete Task", e);
    }

    const handleEditForm = (e) => {
        console.log("Edit Task", e);
        props.setOpen(true);
        props.setTaskMode("Edit");
        props.setTaskFormData(e);
    }

    const handleViewForm = (e) => {
        console.log("View Task", e);
        console.log("View Task", BASE_APP_URL);
        props.setTaskFormData(e);
    }

    // function CustomRow(props) {
    //     console.log("CustomRow props", props)
    //     return (
    //       <Tooltip title={props['data-row-key']} >
    //         <tr {...props} />
    //       </Tooltip>
    //     );
    //   }
    
    // function CustomRow(props) {
    //     const { children } = props;
      
    //     // Ensure children is an array to avoid errors
    //     const childrenArray = Array.isArray(children) ? children : [children];
      
    //     return (
    //       <tr {...props}>
    //         {childrenArray.map((child, index) => {
    //           // Handle the placeholder case where children is not a valid React element
    //           if (!React.isValidElement(child)) {
    //             return <td key={index}>{child}</td>;
    //           }
      
    //           const { props: { dataIndex, children: cellContent } } = child;
      
    //           // Check if cellContent is undefined or null (for non-data cells)
    //           if (!cellContent) {
    //             return <td key={index} />;
    //           }
      
    //           return (
    //             <td key={dataIndex}>
    //               <Tooltip title={cellContent.toString()}>
    //                 {cellContent}
    //               </Tooltip>
    //             </td>
    //           );
    //         })}
    //       </tr>
    //     );
    //   }
      

    // const columns = [
    //     {
    //         title: 'Id',
    //         // title: () => (
    //         //     <Tooltip title={'Tooltip for Name'}>
    //         //       Name ddddddddddddddddddddddddddddddddddddddddddd
    //         //     </Tooltip>
    //         //   ),
    //         dataIndex: 'id',
    //         key: 'id',
    //         sorter: true,
    //         // render: (text) => <a>{text}</a>,
    //         // render: (_,text) => (
    //         //     <Tooltip title={text}>
    //         //         <span>{text}</span>
    //         //     </Tooltip>
    //         // ),
    //         // // width: '20%',
    //         // render: (text, record) => (
    //         //     <Tooltip title={`Name: ${text}`} visible={hoveredCell === record.key}>
    //         //       <span
    //         //         onMouseEnter={() => setHoveredCell(record.key)}
    //         //         onMouseLeave={() => setHoveredCell(null)}
    //         //       >
    //         //         {text}
    //         //       </span>
    //         //     </Tooltip>
    //         //   ),
    //         // render: (text) => (
    //         //     <Tooltip title={`Name: ${text}`}>
    //         //       <span>{text}</span>
    //         //     </Tooltip>
    //         //   ),
    //         render: (text) => (
    //             <Popover content={"hddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"} placement="topLeft" title="">
    //               <a style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
    //                 {"fjdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"}
    //               </a>
    //             </Popover>
    //           ),
    //         // ...getColumnSearchProps('id'),
    //     },
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //         sorter: true,
    //         render: (_,text) => <a>{text}</a>,
    //         // width: '20%',
    //         ...getColumnSearchProps('name'),
    //     },
    //     // {
    //     //     title: 'Age',
    //     //     dataIndex: 'age',
    //     //     key: 'age',
    //     //     filters: [
    //     //         {
    //     //             text: 'Male',
    //     //             value: 'male',
    //     //         },
    //     //         {
    //     //             text: 'Female',
    //     //             value: 'female',
    //     //         },
    //     //     ],
    //     // },
    //     {
    //         title: 'Task',
    //         dataIndex: 'task',
    //         key: 'task',
    //     },
    //     {
    //         title: 'Progress',
    //         dataIndex: 'progress',
    //         key: 'progress',
    //     },
    //     {
    //         title: 'Task Tommorow',
    //         dataIndex: 'taskTodo',
    //         key: 'taskTodo',
    //     },
    //     {
    //         title: 'Leave',
    //         dataIndex: 'leave',
    //         key: 'leave',
    //     },
    //     // {
    //     //     title: 'Tags',
    //     //     key: 'tags',
    //     //     dataIndex: 'tags',
    //     //     render: (_, { tags }) => (
    //     //         <>
    //     //             {tags.map((tag) => {
    //     //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //     //                 if (tag === 'loser') {
    //     //                     color = 'volcano';
    //     //                 }
    //     //                 return (
    //     //                     <Tag color={color} key={tag}>
    //     //                         {tag.toUpperCase()}
    //     //                     </Tag>
    //     //                 );
    //     //             })}
    //     //         </>
    //     //     ),
    //     // },
    //     {
    //         title: 'Action',
    //         key: 'action',
    //         render: (_, record) => (
    //             <Space size="middle">
    //                 <Button type="link" onClick={ () => handleViewForm(record)}>
    //                     <EyeOutlined />                    
    //                 </Button>
    //                 <Button type="link" onClick={ () => handleEditForm(record)}>
    //                     <EditOutlined />
    //                 </Button>
    //                 <Button type="link" onClick={ () => handleDeleteForm(record)}>
    //                     <DeleteOutlined />
    //                 </Button>
    //             </Space>
    //         ),
    //     },
    // ];


    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          sorter: true,
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <a style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </a>
            </Popover>
          ),
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          sorter: true,
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <a style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </a>
            </Popover>
          ),
        },
        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task',
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </span>
            </Popover>
          ),
        },
        {
          title: 'Progress',
          dataIndex: 'progress',
          key: 'progress',
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </span>
            </Popover>
          ),
        },
        {
          title: 'Task Tomorrow',
          dataIndex: 'taskTodo',
          key: 'taskTodo',
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </span>
            </Popover>
          ),
        },
        {
          title: 'Leave',
          dataIndex: 'leave',
          key: 'leave',
          ellipsis: true,
          render: (text) => (
            <Popover content={text} placement="topLeft" title="">
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', maxWidth: '150px' }}>
                {text}
              </span>
            </Popover>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <Button type="link" onClick={() => handleViewForm(record)}>
                <EyeOutlined />
              </Button>
              <Button type="link" onClick={() => handleEditForm(record)}>
                <EditOutlined />
              </Button>
              <Button type="link" onClick={() => handleDeleteForm(record)}>
                <DeleteOutlined />
              </Button>
            </Space>
          ),
        },
      ];
    return (
        <Table
            columns={columns}
            rowKey={(record) => record.key}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
        />
    )
}
export default ViewTasksComponent;