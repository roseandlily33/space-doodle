import styled from 'styled-components';

export const TableContainer = styled.table`
    width: 100%;
    margin-top: 1em;
    td{
        color: ${({theme}) => theme.blue};
        text-align: center;
    }
`;