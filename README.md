# Artifically Intelligent Flappy Bird

![FlappyBird AI](https://i.imgur.com/398aIT6.jpg)

I've always been fascinated with AI. To learn how it actually works, I created my version of Flappy Bird game where the bird can fly by itself. I use pure JavaScript with p5.js library for the graphics. All assets (except the bird sprites) are designed by myself.

I want the bird to learn that dying is bad, and flying through the gap is good. So I give the it a brain using Artificial Neural Network. It needs to know its horizontal distance from the pipe group, vertical distance to top and bottom pipe, and vertical speed.

For learning, I use neuroevolution algorithm, which is learning through natural selection & evolution. Simply put, I spawn a population of 50 birds. Each bird have fitness score that depends on some variables. After all birds die, I pick a bird with highest fitness score. Then, I clone and mutate its neural network structure to the next generation of birds. The game restarts and the cycle repeats. 

Live demo: https://apps.purema.xyz/flappybird-ai
