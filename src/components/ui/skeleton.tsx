import React from "react";

interface SkeletonProps {
    height?: string | number;
    width?: string | number;
    className: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ height, width, className = " " }) => {
    return(
        <div className={`bg-gray-300 animate-shimmer rounded-md ${className}`}
        style={{height, width}} />
    )
}

export default Skeleton;