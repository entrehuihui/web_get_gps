package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()
	r.Static("/static/", "./dist/static")
	r.StaticFile("/", "./dist/index.html")
	// 启动服务器
	if err := r.Run(":8804"); err != nil {
		log.Fatal(err)
	}
}
