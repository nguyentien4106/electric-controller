import { ACCOUNT_ROUTE_PATH, COLLABORATORS_ROUTE_PATH, DONATE_ROUTE_PATH, JOBS_ROUTE_PATH } from "../constant/paths";

export const menuItems = (navigate, isAdmin) => isAdmin ? adminItems(navigate) : userItems(navigate)

const userItems = navigate => [
    {
        key: "customer/find-talent",
        label: "Talents",
        onClick: () => navigate(COLLABORATORS_ROUTE_PATH.collaborators)
    },
    {
        key: "jobs",
        label: "Jobs",
        onClick: () => navigate(JOBS_ROUTE_PATH.jobs)
    },
    {
        key: "post-job",
        label: "Tạo",
        children: [
            {
                key: "create-profile",
                label: "Hồ sơ Talent",
                onClick: () => navigate(ACCOUNT_ROUTE_PATH.collaboratorSetting)
            },
            {
                key: "create-job",
                label: "Job",
                onClick: () => navigate(JOBS_ROUTE_PATH.post)
            },
        ]
    },
    {
        key: "donate",
        label: "Donate",
        onClick: () => navigate(DONATE_ROUTE_PATH.donate),
    }
];

const adminItems = navigate => [
    {
        key: "customer/find-talent",
        label: "Talents",
        onClick: () => navigate(COLLABORATORS_ROUTE_PATH.collaborators)
    },
    {
        key: "jobs",
        label: "Jobs",
        onClick: () => navigate(JOBS_ROUTE_PATH.jobs)
    },
    {
        key: "post-job",
        label: "Tạo",
        children: [
            {
                key: "create-profile",
                label: "Hồ sơ Talent",
                onClick: () => navigate(ACCOUNT_ROUTE_PATH.collaboratorSetting)
            },
            {
                key: "create-job",
                label: "Job",
                onClick: () => navigate(JOBS_ROUTE_PATH.post)
            },
        ]
    },
    {
        key: "donate",
        label: "Donate",
        onClick: () => navigate(DONATE_ROUTE_PATH.donate),
    },
    {
        key: "manage",
        label: "Quản lý",
        children: [
            {
                key: "manage-collaborator",
                label: "Quản lý Collaborator",
                onClick: () => navigate("/manage/users")
            },
            {
                key: "services",
                label: "Services",
                onClick: () => navigate("/manage/services")

            }
        ]
    }
]

export const getStyles = (screens, token) => ({
    container: {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        margin: "0 auto",
        padding: screens.md
            ? `0px ${token.paddingLG}px`
            : `0px ${token.padding}px`,
    },
    header: {
        backgroundColor: token.colorBgContainer,
        borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        position: "relative",
    },
    logo: {
        display: "block",
        height: token.sizeLG,
        left: "50%",
        position: screens.md ? "static" : "absolute",
        top: "50%",
        transform: screens.md ? " " : "translate(-50%, -50%)",
    },
    menu: {
        backgroundColor: "transparent",
        borderBottom: "none",
        lineHeight: screens.sm ? "4rem" : "3.5rem",
        marginLeft: screens.md ? "0px" : `-${token.size}px`,
        width: screens.md ? "inherit" : token.sizeXXL,
    },
    menuContainer: {
        alignItems: "center",
        display: "flex",
        gap: token.size,
        width: "100%",
        justifyContent: "space-between",
    },
})