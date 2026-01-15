"use strict";

const Slider ={
    intervalId:undefined,
    slider:{
        dots:[],
        items:[],
        btns:[]
    },
    time:undefined,
    create(imgs){
        const container = document.createElement("div");
        container.classList.add("slider-container");
    
        const dots = document.createElement("div");
        dots.classList.add("dots");
        
        imgs.forEach((img, i)=>{
            const div = document.createElement("div");
            div.classList.add("items", "fade");
            const image = document.createElement("img");
            image.src = img;
            div.append(image);
            const dot = document.createElement("span");
            dot.classList.add("dot");
            dot.dataset.id = i;
            dots.append(dot);
            container.append(div);
        //ajout version objet
            this.slider.items.push(div);
            this.slider.dots.push(dot);

        })
        container.append(dots);
        const next = document.createElement("a");
        // next.classList.add("next");
        next.innerHTML = "&#10095;";
        const prev = document.createElement("a");
        // prev.classList.add("prev");
        prev.innerHTML = "&#10094;";
        //ajout version objet
        container.append(next, prev);
        this.slider.btns.push(prev, next);
        return container;
    },

    showItems(n){
        let index = n> this.slider.items.length -1 ? 0: n<0? this.slider.items.length-1: n;
            /**
             * const items = this.slider.items;
             */
        this.slider.items.forEach((item, i)=>{
            item.style.display = "none";
            this.slider.dots[i].classList.remove("active");
        })
        this.slider.items[index].style.display = "block";
        this.slider.dots[index].classList.add("active");
    },
    currentItem(e){
        clearInterval(this.intervalId);
        // Affiche l'image qui correspond au point.
        let n = parseInt(e.target.dataset.id);
        this.showItems(n);
    },
    changeItem(e){
        clearInterval(this.intervalId);
        let n = document.querySelector(".dot.active").dataset.id;
        if(e.target.classList.contains("next")){
            this.showItems(++n);
        }else{
            this.showItems(--n);
        }
        this.startInterval()
    },
    init(timing = 6000){
        this.time = timing;
        this.showItems(0);
        this.slider.dots.forEach(dot=>dot.addEventListener("pointerdown", this.currentItem.bind(this)));
        // this.slider.btns.forEach(btn=>btn.addEventListener("pointerdown", this.changeItem.bind(this)));
        this.startInterval();
    },
    startInterval() {
        this.intervalId = setInterval(() => {
            // Obtenir l'index de l'image actuellement visible
            let currentIndex = this.slider.items.findIndex(item => item.style.display === "block");
            // Incrémenter l'index pour passer à l'image suivante
            let nextIndex = currentIndex + 1;
            // Si l'index est supérieur au nombre d'images, revenir à 0 (première image)
            if (nextIndex >= this.slider.items.length) {
                nextIndex = 0;
            }
            // Afficher la nouvelle image
            this.showItems(nextIndex);
        }, this.time);
    }
}
export default Slider;