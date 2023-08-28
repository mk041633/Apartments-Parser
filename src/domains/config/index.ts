type AppConfig = {
    redis: string;
    botToken: string
}

const Config: AppConfig = {
    redis: "redis://127.0.0.1:6379",
    botToken: '6594559742:AAFp6e3FbitGVpJ0nj2CrnV-ZhT4FitjXhY'
};

export { Config };