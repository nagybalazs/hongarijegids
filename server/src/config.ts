let config: {
    commonConfig: {
        notifyUser: string,
        offerNotifyUser: string
    },
    mysqlConfig: { 
        user: string, 
        password: string, 
        host: string, 
        database: string,
        port: number
    },
    smtpConfig: {
        port: number,
        host: string,
        user: string,
        password: string
    }
} = { 
    mysqlConfig: {
        user: 'hongari1_admin',
        password: 'Password11',
        host: 'localhost',
        database: 'hongari1_db',
        port: 3306
    },
    smtpConfig: {
        port: 465,
        host: 'a2hosting.com',
        user: 'info@hongarijegids.com',
        password: 'Password11'
    },
    commonConfig: {
        notifyUser: 'info@hongarijegids.com',
        offerNotifyUser: 'offerrequest@hongarijegids.com'
    }
}

export default config;

