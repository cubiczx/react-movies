import React from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './Pagination.scss';

export default function PaginationMovies(props: any) {
    const { current, total, pageSize, onChange } = props;

    return (
        <nav aria-label="paginación">
            <Pagination
                className="pagination"
                current={current}
                total={total}
                pageSize={pageSize}
                onChange={onChange}
            />
        </nav>
    );
}