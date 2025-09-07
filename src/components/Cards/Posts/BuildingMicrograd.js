import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../../../globals.css';

const BuildingMicrograd = () => {
  const contentRef = useRef(null);

  const renderers = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const introduction = `
# Building Micrograd: A Minimal Autograd Engine

Training a neural network typically involves two key steps: **defining the architecture** and **optimizing its parameters** through training. To truly understand how this process works, it's valuable to look behind the scenes at the mechanics of neural networks and backpropagation.

One good way to gain this intuition is by building **[Micrograd](https://github.com/karpathy/micrograd)**, a minimalistic automatic differentiation engine developed by Andrej Karpathy.

*Micrograd* is an **autograd engine**, meaning it implements *backpropagation*—the algorithm that efficiently computes the gradients of a loss function with respect to network weights. These gradients are then used to iteratively adjust the weights, reducing the loss and improving the model's performance.

Backpropagation lies at the **mathematical core of modern deep learning frameworks** such as PyTorch and TensorFlow. By working through *Micrograd*, we can build mathematical expressions, observe how gradients flow through them, and gain a clear, intuitive understanding of how neural networks actually learn.

\`\`\`python
from micrograd.engine import Value
from graphviz import Digraph
# --- Display table using rich ---
from rich.console import Console
from rich.table import Table
from rich import box

# --- Forward pass ---
a = Value(-4.0)
b = Value(2.0)

c = a + b
d = a * b + b**3
c += c + 1
c += 1 + c + (-a)
d += d * 2 + (b + a).relu()
d += 3 * d + (b - a).relu()
e = c - d
f = e**2
g = f / 2.0
g += 10.0 / f

# --- Backward pass ---
g.backward()

# --- Collect all nodes for display ---
nodes = {
    "a": a,
    "b": b,
    "c": c,
    "d": d,
    "e": e,
    "f": f,
    "g": g
}

# --- Gradient meanings ---
meanings = {
    "a": "Increasing 'a' slightly increases 'g' a lot.",
    "b": "Increasing 'b' slightly increases 'g' even more.",
    "c": "c contributes positively to g.",
    "d": "d contributes negatively to g.",
    "e": "e contributes positively to g.",
    "f": "f contributes slightly to g.",
    "g": "Output node; gradient is always 1."
}

console = Console()

table = Table(title="[bold cyan]Computational Graph - Forward & Backward Pass[/bold cyan]",
              box=box.HEAVY_EDGE)

# --- Add columns for node info ---
table.add_column("Node", style="bold magenta", justify="center")
table.add_column("Forward (.data)", style="bold green", justify="right")
table.add_column("Gradient (.grad)", style="bold green", justify="right")
table.add_column("Meaning", style="bold cyan", justify="left")

# --- Populate table with node data and gradients ---
for name, node in nodes.items():
    table.add_row(name, f"{node.data:.4f}", f"{node.grad:.4f}", meanings[name])

console.print(table)
\`\`\`

[MicrogradTable.png]

## Understanding Gradients in Micrograd: A Comprehensive Guide

### What the Gradient Actually Represents

At its core, a gradient tells us how sensitive our output is to changes in our inputs. For any node \`x\` in your computation graph, the gradient is defined mathematically as:

$$
x.grad = \\frac{\\partial g}{\\partial x}
$$

**The gradient is the rate of change** — it tells us how much the output \`g\` will change if we make a small adjustment to \`x\`. Think of it as the "sensitivity coefficient" between variables.

#### Interpreting Gradient Values

* **If \`x.grad = 138\`**: A tiny increase in \`x\` (say, +0.001) will cause \`g\` to increase by approximately 138 × 0.001 = 0.138. This indicates that \`x\` has a **strong positive influence** on the output.

* **If \`x.grad = -1\`**: A tiny increase in \`x\` will cause \`g\` to decrease by roughly the same amount. This shows \`x\` has a **moderate negative influence** on the output.

* **If \`x.grad = 0\`**: Changes in \`x\` don't affect \`g\` at all (at least locally). Either \`x\` doesn't contribute to \`g\`, or we're at a critical point like a minimum or maximum.

* **If \`x.grad = 0.001\`**: \`x\` has only a **very weak positive influence** on \`g\`. Small changes in \`x\` barely move the output.

**Key insight**: Gradients are essentially the **slopes of the output function with respect to each variable**. Large absolute values mean steep slopes (high sensitivity), while values near zero mean flat slopes (low sensitivity).
`;

  const section2 = `
## How Gradients Are Computed: The Computational Graph

Micrograd represents computations as a **directed acyclic graph (DAG)** where:

1. **Nodes** represent values — these can be inputs, intermediate calculations, or the final output
2. **Edges** represent mathematical operations that connect parent nodes to child nodes
3. Each edge "remembers" how to compute the local derivative for that specific operation

### The Backpropagation Process

When you call \`g.backward()\`, Micrograd executes a carefully orchestrated process:

1. **Initialization**: Start at the output node \`g\` and set its gradient to 1 (we'll explain why below)
2. **Topological traversal**: Visit nodes in reverse topological order, ensuring we process each node only after all its children have been processed
3. **Chain rule application**: For each node, compute how changes in that node affect the final output by applying the chain rule:

$$
\\frac{\\partial g}{\\partial a} = \\sum_{\\text{children } c} \\frac{\\partial g}{\\partial c} \\cdot \\frac{\\partial c}{\\partial a}
$$

This equation says: "The gradient of \`g\` with respect to \`a\` equals the sum of all paths from \`a\` to \`g\`, where each path multiplies the gradients along the way."

### A Concrete Example

Consider the computation: \`g = (a * b) + (a * c)\`

The computational graph looks like:
\`\`\`
a ──┐
    ├─→ (a*b) ──┐
b ──┘           ├─→ g = (a*b) + (a*c)
                │
a ──┐           │
    ├─→ (a*c) ──┘
c ──┘
\`\`\`

During backpropagation:
- \`g.grad = 1\` (by definition)
- \`(a*b).grad = 1\` (since addition passes gradients unchanged)
- \`(a*c).grad = 1\` (same reason)
- \`a.grad = b + c\` (since \`a\` appears in two paths to \`g\`)
- \`b.grad = a\` and \`c.grad = a\`

---

## Why Gradients Are Crucial for Machine Learning

Gradients are the foundation of how neural networks learn. They enable the **gradient descent optimization algorithm**:

$$
\\text{new parameter} = \\text{old parameter} - \\text{learning rate} \\times \\text{gradient}
$$

### The Learning Process

1. **Forward pass**: Compute the output (and loss) using current parameters
2. **Backward pass**: Compute gradients showing how each parameter affects the loss
3. **Parameter update**: Adjust parameters in the direction that reduces the loss
4. **Repeat**: Continue this process until the model converges

**Why this works**: Gradients point in the direction of steepest **increase**. By moving in the opposite direction (hence the minus sign), we move toward lower loss values.

### Gradient Magnitudes Tell a Story

- **Large gradients**: The parameter has strong influence on the loss. Updates will be significant.
- **Small gradients**: The parameter has weak influence. Updates will be subtle.
- **Zero gradients**: The parameter doesn't affect the loss (locally). No updates will occur.
- **Exploding gradients**: Gradients become extremely large, causing unstable training.
- **Vanishing gradients**: Gradients become extremely small, causing learning to stall.
`;

  const section3 = `
## The Special Case: Gradient of the Output Node

When you call \`g.backward()\`, Micrograd must initialize the backpropagation process. It does this by setting:

$$
g.grad = 1
$$

### Why Does This Make Mathematical Sense?

The gradient represents $\\frac{\\partial g}{\\partial g}$, which is asking: "How much does \`g\` change when \`g\` changes?" 

From basic calculus, we know that:
$$
\\frac{d}{dx} x = 1
$$

Therefore:
$$
\\frac{\\partial g}{\\partial g} = 1
$$

**This isn't arbitrary** — it's a fundamental mathematical truth that any variable has a derivative of 1 with respect to itself.

### Why Is This Initialization Necessary?

The chain rule requires this starting point. Consider any parent node \`p\` of \`g\`:

$$
p.grad = g.grad \\times \\frac{\\partial g}{\\partial p}
$$

If we didn't set \`g.grad = 1\`, then:
- If \`g.grad = 0\`, all gradients would be zero (no learning)
- If \`g.grad = 2\`, all gradients would be doubled (incorrect scaling)
- Only \`g.grad = 1\` preserves the true mathematical relationships

---

## Common Misconceptions and Clarifications

### Misconception 1: "Gradients show the direction to the minimum"
**Reality**: Gradients show the direction of steepest **increase**. To minimize a function, we move in the **opposite** direction of the gradient.

### Misconception 2: "Larger gradients are always better"
**Reality**: Extremely large gradients can cause optimization to overshoot the minimum, leading to unstable training. Moderate gradients often work best.

### Misconception 3: "Zero gradient means the variable is unimportant"
**Reality**: Zero gradient means the variable doesn't affect the output **locally**. The variable might become important if we move to a different region of the parameter space.

### Misconception 4: "Gradients are exact measures of change"
**Reality**: Gradients give the **instantaneous rate of change**. For large changes, the actual change might differ due to the curvature of the function.

\`\`\`python
def draw_graph():
    dot = Digraph(graph_attr={"rankdir": "LR"})  # Left-to-right layout

    # Input nodes
    dot.node("a", "a = -4.0", shape="box", style="filled", color="lightgreen")
    dot.node("b", "b = 2.0", shape="box", style="filled", color="lightgreen")

    # Intermediate nodes
    dot.node("c", "c = a + b", shape="box", style="filled", color="lightblue")
    dot.node("d", "d = a*b + b^3", shape="box", style="filled", color="lightblue")
    dot.node("e", "e = c - d", shape="box", style="filled", color="lightblue")
    dot.node("f", "f = e^2", shape="box", style="filled", color="lightblue")

    # Output node
    dot.node("g", "g = f/2 + 10/f", shape="box", style="filled", color="orange")

    # Define edges (dependencies)
    dot.edges([("a", "c"), ("b", "c")])
    dot.edge("a", "d")
    dot.edge("b", "d")
    dot.edge("c", "e")
    dot.edge("d", "e")
    dot.edge("e", "f")
    dot.edge("f", "g")

    return dot

draw_graph()
\`\`\`

[MicragradGraph.png]
`;

  const section4 = `
# Building Expression Graphs in Micrograd: Understanding the Foundation

## The Automatic Graph Construction Process

When you define mathematical computations using inputs like \`a\` and \`b\` to produce an output \`g\`, Micrograd performs something quite elegant: it **automatically constructs a computational graph** that captures the entire structure of your computation. This isn't just a side effect—it's the core mechanism that enables automatic differentiation.

### How the Graph Gets Built

Consider what happens when you write \`c = a + b\`. Behind the scenes, Micrograd:

1. **Creates a new node** \`c\` to represent the result of this operation
2. **Stores references** (pointers) to the child nodes \`a\` and \`b\` within \`c\`
3. **Records the operation type** (addition, in this case) so it knows how to compute gradients later
4. **Links the computation** into the growing expression graph

This process happens **automatically** as you compose mathematical operations. Each new operation extends the graph, creating a complete computational history that traces how your final output was computed from the original inputs.

**The key insight**: Every node "remembers" exactly how it was computed and from which inputs. This computational memory is what makes backpropagation possible.
`;

  const section5 = `
## The Forward and Backward Pass System

Micrograd operates on a clean two-phase model that separates computation from differentiation:

### Forward Pass: Executing Your Mathematical Recipe

During the forward pass, you're essentially **executing your computation** to get numerical results. When you access \`g.data\`, you're retrieving the numerical value that resulted from applying all the mathematical operations in sequence.

This forward computation happens as you build your expression. Each operation immediately computes its result using the current values of its inputs, storing the outcome for immediate use or further computation.

### Backward Pass: Tracing Sensitivity Through the Graph

The backward pass is where automatic differentiation shines. When you call \`g.backward()\`, you're triggering a sophisticated process that computes how sensitive your output is to every single input and intermediate value in your computation.

**The magic of backpropagation**: Starting from the output node \`g\`, the algorithm works backwards through the graph, systematically applying the chain rule from calculus. This process computes partial derivatives—the gradients—that quantify how much each variable influences the final result.

## Understanding What Gradients Tell You

The gradients computed during backpropagation provide **quantitative sensitivity analysis** of your computation:

### Interpreting Gradient Magnitudes

When you see \`a.grad ≈ 138\`, this tells you something profound: **a small positive change in \`a\` will cause \`g\` to increase at a rate of about 138**. This means \`a\` has a strong positive influence on your output.

Similarly, \`b.grad ≈ 645\` indicates that \`b\` has an even stronger positive influence—changes in \`b\` affect the output more dramatically than equivalent changes in \`a\`.

### The Broader Significance

These gradient values form the foundation of how neural networks learn. They answer the critical question: **"If I want to increase (or decrease) my output, which inputs should I adjust, and by how much?"**

In machine learning contexts:
- **Large positive gradients** suggest increasing that parameter will significantly improve your objective
- **Large negative gradients** suggest decreasing that parameter will improve your objective  
- **Small gradients** indicate the parameter has minimal local impact
- **Zero gradients** suggest the parameter doesn't affect the output (at least locally)

## Neural Networks as Mathematical Expressions

Here's a perspective that clarifies the relationship between neural networks and automatic differentiation: **Neural networks are fundamentally mathematical expressions**. They take input data and network parameters (weights and biases) and transform them through a series of mathematical operations to produce outputs—whether those are predictions, probabilities, or loss values.

What makes neural networks special isn't that they require unique mathematical treatment, but rather that they're **very complex mathematical expressions** with millions or billions of parameters. The same mathematical principles that govern simple expressions like \`(a * b) + c\` also govern the forward and backward passes through a deep neural network.

## Backpropagation: A General-Purpose Tool

This leads to an important realization: **backpropagation is not specifically a neural network algorithm**. It's a general technique for computing gradients in arbitrary mathematical expressions. Neural networks just happen to be a particularly important and complex class of mathematical expressions where we need these gradients.

You can use backpropagation to:
- Optimize any differentiable function
- Perform sensitivity analysis on complex systems
- Solve inverse problems in engineering and science
- Train any model that can be expressed as a differentiable computation

The power of libraries like Micrograd is that they make this general capability accessible for any mathematical expression you can construct.
`;

  const section6 = `
## Why Micrograd Uses Scalars: Educational Philosophy

Micrograd operates at the level of **individual scalar values**—single numbers like -4.7 or 2.0—rather than the multi-dimensional tensors used in production deep learning libraries. This design choice reflects a specific educational philosophy.

### The Learning Benefits of Scalar Operations

By working with individual scalars, Micrograd breaks neural networks down to their **most fundamental computational units**. Every operation is either basic [arithmetic](https://en.wikipedia.org/wiki/Arithmetic) (addition, multiplication) or simple functions ([exponential](https://en.wikipedia.org/wiki/Exponential_function), [logarithm](https://en.wikipedia.org/wiki/Logarithm)) applied to individual numbers.

This approach offers several pedagogical advantages:

**Conceptual Clarity**: When you see \`a * b\` in Micrograd, it's literally multiplying two numbers. There's no hidden complexity involving [matrix dimensions](https://en.wikipedia.org/wiki/Matrix_(mathematics)), [broadcasting rules](https://numpy.org/doc/stable/user/basics.broadcasting.html), or memory layouts.

**Direct Gradient Observation**: You can examine the gradient of every single scalar in your computation, making it easy to understand exactly how changes propagate through the system.

**Intuitive Debugging**: When something goes wrong, you can trace through the computation step-by-step at the most granular level, seeing exactly how each number influences every other number.

### The Tensor Reality: Why Scalars Don't Scale

While educational, the scalar approach has obvious limitations for practical applications. Modern neural networks involve millions or billions of parameters, and processing them one scalar at a time would be computationally prohibitive.

**[Tensors](https://en.wikipedia.org/wiki/Tensor) solve the scalability problem**: Tensors are essentially multi-dimensional [arrays](https://en.wikipedia.org/wiki/Array_data_structure) of scalars that can be processed in parallel. A single tensor operation like [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication) can perform thousands of scalar multiplications simultaneously, leveraging modern [GPU architectures](https://en.wikipedia.org/wiki/Graphics_processing_unit) for massive speedup.

**The trade-off**: Tensors enable practical deep learning but introduce complexity that can obscure the underlying mathematical principles. Concepts like [broadcasting](https://numpy.org/doc/stable/user/basics.broadcasting.html), [tensor contractions](https://en.wikipedia.org/wiki/Tensor_contraction), and [memory layout optimization](https://pytorch.org/docs/stable/tensor_attributes.html#torch.torch.memory_format) can make it harder to understand what's fundamentally happening mathematically.

## Micrograd's Educational Mission

Micrograd serves as a **conceptual bridge** between mathematical theory and practical implementation. It provides a minimal framework where you can:

**Experiment with gradient computation** at a fundamental level without getting lost in the complexity of high-dimensional tensor operations.

**Build intuition** about how backpropagation and the chain rule work in practice, seeing every step of the computation explicitly.

**Understand the principles** that underlie more sophisticated libraries like [PyTorch](https://pytorch.org/) and [TensorFlow](https://www.tensorflow.org/), making those tools less mysterious when you eventually use them.

**Focus on learning** rather than performance, prioritizing clarity and understanding over [computational efficiency](https://en.wikipedia.org/wiki/Computational_complexity).

The goal isn't to replace production-ready libraries, but to provide a foundation of understanding that makes those libraries more accessible and their behavior more predictable. Once you understand how automatic differentiation works at the scalar level, scaling up to tensors becomes a matter of [optimization](https://en.wikipedia.org/wiki/Mathematical_optimization) rather than conceptual mystery.
`;

  const borderStyle = {
    border: '0',
    height: '1px',
    backgroundColor: '#2c2c2c',
    margin: '22px auto',
    transition: 'background-color 0.3s ease',
  };

  const Border = () => <div style={borderStyle} />;
  
  const handleJumpToTop = (e) => {
    e.preventDefault();
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        className='card-content'
        style={{
          marginTop: '-30px',
          marginLeft: '-30px',
          marginRight: '-30px',
          marginBottom: '-10px',
          height: 'calc(100% - 40px)',
          overflowY: 'auto',
        }}
        ref={contentRef}
      >
        <ReactMarkdown components={renderers}>{introduction}</ReactMarkdown>
        <Border />
        <Border />
        <ReactMarkdown components={renderers}>{section2}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{section3}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{section4}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{section5}</ReactMarkdown>
        <Border />
        <ReactMarkdown components={renderers}>{section6}</ReactMarkdown>
        <Border />
        <div style={{ fontSize: '1.1em', color: '#eee' }}>
          Jump back to the top{' '}
          <a
            href="#top"
            onClick={handleJumpToTop}
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            ↩
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuildingMicrograd;