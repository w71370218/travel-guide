import './Pagination.css';
//import svg
import ChevronBarLeft from "../assets/svg/Chevron bar left.svg" // |<
import ChevronLeft from "../assets/svg/Chevron left.svg" // <
import ChevronRight from "../assets/svg/Chevron right.svg" // >
import ChevronBarRight from "../assets/svg/Chevron bar right.svg" // >|

const Pagination = (props) => {
    const width = 16;
    const height = 16;
    let page = props.page.length > 7 ?
        props.page.slice(props.pageIndex - 3, props.pageIndex + 4) :
        props.page.slice()
    if (props.pageIndex < 4) {
        page = props.page.slice(0, 7)
    }
    else if (props.pageIndex > props.page.length - 4) {
        page = props.page.slice(props.page.length - 7, props.page.length)
    }

    return (
        <>
            <nav className="pagination" aria-label="Pagination">
                <a onClick={() => props.setPageIndex(0)} href="#" className="page-item func first">
                    <span className="sr-only">First</span>
                    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg"><use href={`${ChevronBarLeft}#svg`} width={width} height={height} /></svg>
                </a>
                <a onClick={() => { if (props.pageIndex > 0) { props.setPageIndex(props.pageIndex - 1) } }} href="#" className="page-item func">
                    <span className="sr-only">Previous</span>
                    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg"><use href={`${ChevronLeft}#svg`} width={width} height={height} /></svg>
                </a>
                {
                    page.map((num, index) => (
                        <span key={index} onClick={() => props.setPageIndex(num - 1)}>
                            <a className={`page-item 
                                 ${num === props.pageIndex + 1 ? 'index' : ''}`}>
                                {num}
                            </a>
                        </span>
                    ))
                }
                <a onClick={() => { if (props.pageIndex < props.page.length - 1) { props.setPageIndex(props.pageIndex + 1) } }} href="#" className="page-item func">
                    <span className="sr-only">Next</span>
                    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg"><use href={`${ChevronRight}#svg`} width={width} height={height} /></svg>
                </a>
                <a onClick={() => props.setPageIndex(props.page.length - 1)} href="#" className="page-item func last">
                    <span className="sr-only">Last</span>
                    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg"><use href={`${ChevronBarRight}#svg`} width={width} height={height} /></svg>
                </a>
            </nav>
        </>
    )
}

export default Pagination;