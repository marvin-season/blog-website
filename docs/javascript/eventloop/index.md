---
title: Eventloop
tags: [eventloop, javascript]
---

# Event loop

## What is the event loop

The **event loop** is the secret behind JavaScript’s asynchronous programming, JS executes all operations on a Single thread, but using a few smart data structures, it gives us the illusion of multi-threading.

## A few smart data structures

The **call stack** is responsible for keeping track of all the operations in line to be executed. Whenever a function is finished, it is popped from the stack.

The **event queue** is responsible for sending new functions to the stack for processing. It follows the queue data structure to maintain the correct sequence in which all operations should be sent for execution.

## How does it work

Whenever an **async function** is called, it is sent to a _browser API_. These are APIs built into the browser. Based on the command received from the call stack, the API starts its own single-threaded operation.

An example of this is the `setTimeout` method. When a `setTimeout` operation is processed in the stack, it is sent to the corresponding API which waits till the specified time to send this operation back in for processing.

Where does it send the operation? The **event queue**. Hence, we have a cyclic system for running async operations in JavaScript. The language itself is single-threaded, but the browser APIs act as separate threads.

The event loop facilitates this process; it constantly checks whether or not the call stack is empty. If it is empty, new functions are added from the event queue. If it is not, then the current function call is processed.

## Grabbing the operation

According to the priority of the operation from large to small, the event queue is divided into **micro queue**, **interaction queue**, and **delay queue**. When the call stack is empty, an operation is grabbed based on the priority of the queue.
